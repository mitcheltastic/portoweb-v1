import { pgTable, serial, varchar, text, pgEnum, timestamp, integer } from "drizzle-orm/pg-core";

export const messageStatusEnum = pgEnum("message_status", ["unread", "read", "archived"]);

export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  message: text("message").notNull(),
  status: messageStatusEnum("status").default("unread").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const rateLimits = pgTable("rate_limits", {
  ip: varchar("ip", { length: 255 }).primaryKey(),
  messageCount: integer("message_count").default(0).notNull(),
  loginAttempts: integer("login_attempts").default(0).notNull(),
  lastMessageAt: timestamp("last_message_at", { withTimezone: true }).defaultNow().notNull(),
  lastLoginAt: timestamp("last_login_at", { withTimezone: true }).defaultNow().notNull(),
});

export type Message = typeof messages.$inferSelect;
export type NewMessage = typeof messages.$inferInsert;

export type RateLimit = typeof rateLimits.$inferSelect;
export type NewRateLimit = typeof rateLimits.$inferInsert;
