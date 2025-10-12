import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const inschrijvingen = sqliteTable("inschrijvingen", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  data: text("data").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
});

export const bestellingen = sqliteTable("bestellingen", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  data: text("data").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
});
