"use server";

import { SignJWT, jwtVerify } from "jose";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import nodemailer from "nodemailer";
import { db } from "@/db";
import { rateLimits } from "@/db/schema";
import { eq } from "drizzle-orm";

const getSecret = () => {
  const secretKey = process.env.JWT_SECRET;
  if (!secretKey) {
    throw new Error("JWT_SECRET is not configured inside env variables.");
  }
  return new TextEncoder().encode(secretKey);
};

export async function initiateLogin(formData: FormData) {
  try {
    const id = formData.get("id") as string | null;
    const password = formData.get("password") as string | null;

    const adminId = process.env.ADMIN_ID;
    const adminPassword = process.env.ADMIN_PASSWORD;
    const adminEmail = process.env.ADMIN_EMAIL;
    const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;

    if (!adminId || !adminPassword || !adminEmail || !gmailAppPassword) {
      return { success: false, error: "Authentication system is misconfigured. Missing environment variables." };
    }

    // 1. IP-based Login Rate Limiting (5 attempts within 15 minutes max)
    const headersList = await headers();
    const rawIp = headersList.get("x-forwarded-for") || "127.0.0.1";
    const ip = rawIp.split(",")[0].trim();

    const now = new Date();
    const fifteenMinutesAgo = new Date(now.getTime() - 15 * 60 * 1000);

    const [limitRecord] = await db
      .select()
      .from(rateLimits)
      .where(eq(rateLimits.ip, ip));

    if (limitRecord) {
      const lastLoginTime = new Date(limitRecord.lastLoginAt);
      if (lastLoginTime >= fifteenMinutesAgo && limitRecord.loginAttempts >= 5) {
        return { success: false, error: "Too many login attempts. System locked for 15 minutes." };
      }
    }

    if (id !== adminId || password !== adminPassword) {
      // Increment login attempts
      if (limitRecord) {
        const lastLoginTime = new Date(limitRecord.lastLoginAt);
        const attempts = lastLoginTime >= fifteenMinutesAgo ? limitRecord.loginAttempts + 1 : 1;
        await db
          .update(rateLimits)
          .set({ loginAttempts: attempts, lastLoginAt: now })
          .where(eq(rateLimits.ip, ip));
      } else {
        await db.insert(rateLimits).values({
          ip,
          loginAttempts: 1,
          lastLoginAt: now,
        });
      }

      return { success: false, error: "Access denied. Invalid ID or Password." };
    }

    // Reset login attempts to 0 on success
    if (limitRecord) {
      await db
        .update(rateLimits)
        .set({ loginAttempts: 0, lastLoginAt: now })
        .where(eq(rateLimits.ip, ip));
    } else {
      await db.insert(rateLimits).values({
        ip,
        loginAttempts: 0,
        lastLoginAt: now,
      });
    }

    // Generate random 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Mail the code
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: adminEmail,
        pass: gmailAppPassword,
      },
    });

    await transporter.sendMail({
      from: `"Mitch's Portfolio Admin" <${adminEmail}>`,
      to: adminEmail,
      subject: "[PORTFOLIO TERMINAL] 2-Factor Authentication Code",
      text: `Your 2-Factor Uplink Verification Code: ${otp}\n\nThis code will expire in 5 minutes.`,
      html: `
        <div style="font-family: monospace; background-color: #09090b; color: #f4f4f5; padding: 24px; border: 1px solid #27272a; border-radius: 8px;">
          <h2 style="color: #10b981; border-bottom: 1px solid #27272a; padding-bottom: 8px;">[ PORTFOLIO TELEMETRY SYSTEM ]</h2>
          <p style="font-size: 14px; color: #a1a1aa;">An admin login attempt has been initiated. Input the following verification code to complete the link:</p>
          <div style="font-size: 32px; font-weight: bold; color: #10b981; letter-spacing: 4px; margin: 24px 0; text-align: center; font-family: monospace;">
            ${otp}
          </div>
          <p style="font-size: 11px; color: #52525b;">TIMESTAMP: ${new Date().toISOString()}</p>
          <p style="font-size: 11px; color: #52525b;">EXPIRES IN: 5 minutes</p>
        </div>
      `,
    });

    // Create 5-minute pending JWT
    const secret = getSecret();
    const pendingToken = await new SignJWT({ otp })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("5m")
      .sign(secret);

    const cookieStore = await cookies();
    cookieStore.set("pending_auth", pendingToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 300, // 5 minutes
    });

    return { success: true, message: "Verification code sent to secure terminal channel." };
  } catch (error: any) {
    console.error("Initiate login failure:", error);
    return { success: false, error: `Failed to initiate login: ${error.message || error}` };
  }
}

export async function verifyOTP(code: string) {
  let isVerified = false;

  try {
    if (!code || code.trim().length !== 6) {
      return { success: false, error: "Verification code must be exactly 6 digits." };
    }

    const cookieStore = await cookies();
    const pendingCookie = cookieStore.get("pending_auth");

    if (!pendingCookie) {
      return { success: false, error: "Uplink session expired. Please restart credentials validation." };
    }

    const secret = getSecret();
    const { payload } = await jwtVerify(pendingCookie.value, secret);
    const savedOtp = payload.otp as string;

    if (savedOtp !== code.trim()) {
      return { success: false, error: "Security key mismatch. Uplink authorization rejected." };
    }

    isVerified = true;

    // Revoke pending token
    cookieStore.delete("pending_auth");

    // Establish long-lived session (24h)
    const sessionToken = await new SignJWT({ role: "admin" })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("24h")
      .sign(secret);

    cookieStore.set("admin_session", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 86400, // 24 hours
    });
  } catch (error: any) {
    console.error("OTP verification error:", error);
    return { success: false, error: "Validation signature expired or corrupted. Access denied." };
  }

  if (isVerified) {
    redirect("/afro-management");
  }
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_session");
  redirect("/afro-management/login");
}
