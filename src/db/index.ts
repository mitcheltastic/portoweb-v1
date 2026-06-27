import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

const connectionString = process.env.DATABASE_URL;

// We fallback to a placeholder string during build time to prevent static analysis module crashes.
const sql = neon(connectionString || "postgresql://mock:mock@localhost/db");
export const db = drizzle(sql, { schema });
