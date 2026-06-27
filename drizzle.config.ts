import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";

// Load the environment variables from .env.local
dotenv.config({ path: ".env.local" });

export default defineConfig({
  schema: "./src/db/schema.ts", // Path to your schema file
  out: "./drizzle",             // Where migration files would be saved (optional for push)
  dialect: "postgresql",        // Tell Drizzle we are using Postgres
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});