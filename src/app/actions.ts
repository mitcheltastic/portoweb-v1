"use server";

import { db } from "@/db";
import { messages, rateLimits } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export async function submitMessage(formData: FormData) {
  try {
    // 1. Honeypot Check (Bots usually fill every visible/invisible input)
    const botField = formData.get("botField") as string | null;
    if (botField && botField.trim()) {
      console.warn("Honeypot field triggered by bot.");
      return { success: true }; // Silent rejection
    }

    const name = formData.get("name") as string | null;
    const email = formData.get("email") as string | null;
    const message = formData.get("message") as string | null;

    if (!name || !name.trim()) {
      return { success: false, error: "Name / Alias is required." };
    }
    if (!email || !email.trim()) {
      return { success: false, error: "Email is required." };
    }
    if (!message || !message.trim()) {
      return { success: false, error: "Message content is required." };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return { success: false, error: "Please enter a valid email address." };
    }

    // 2. IP-based Rate Limiting (3 messages per hour max)
    const headersList = await headers();
    const rawIp = headersList.get("x-forwarded-for") || "127.0.0.1";
    const ip = rawIp.split(",")[0].trim();

    const now = new Date();
    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);

    const [limitRecord] = await db
      .select()
      .from(rateLimits)
      .where(eq(rateLimits.ip, ip));

    if (limitRecord) {
      const lastMsgTime = new Date(limitRecord.lastMessageAt);
      if (lastMsgTime < oneHourAgo) {
        // Reset the message count
        await db
          .update(rateLimits)
          .set({ messageCount: 1, lastMessageAt: now })
          .where(eq(rateLimits.ip, ip));
      } else {
        if (limitRecord.messageCount >= 3) {
          return { success: false, error: "Transmission limit reached. Try again later." };
        }
        await db
          .update(rateLimits)
          .set({ messageCount: limitRecord.messageCount + 1, lastMessageAt: now })
          .where(eq(rateLimits.ip, ip));
      }
    } else {
      // First message from this IP
      await db.insert(rateLimits).values({
        ip,
        messageCount: 1,
        lastMessageAt: now,
      });
    }

    await db.insert(messages).values({
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
      status: "unread",
    });

    return { success: true };
  } catch (error: any) {
    console.error("Failed to submit message:", error);
    return { success: false, error: "Database transmission failed. Please try again later." };
  }
}

export async function updateMessageStatus(id: number, status: "unread" | "read" | "archived") {
  try {
    await db.update(messages)
      .set({ status })
      .where(eq(messages.id, id));

    revalidatePath("/afro-management");
    return { success: true };
  } catch (error) {
    console.error("Failed to update message status:", error);
    return { success: false, error: "Failed to update status." };
  }
}

export async function deleteMessage(id: number) {
  try {
    await db.delete(messages)
      .where(eq(messages.id, id));

    revalidatePath("/afro-management");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete message:", error);
    return { success: false, error: "Failed to delete message." };
  }
}
