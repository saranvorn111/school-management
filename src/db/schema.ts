import {
  mysqlTable,
  varchar,
  text,
  int,
  timestamp,
  mysqlEnum,
} from "drizzle-orm/mysql-core";

export const courseStatusEnum = mysqlEnum("course_status", [
  "ACTIVE",
  "INACTIVE",
]);

export const coursesTable = mysqlTable("courses", {
  id: varchar("id", { length: 36 }).primaryKey(),

  code: varchar("code", { length: 20 }).notNull().unique(),

  name: varchar("name", { length: 255 }).notNull(),

  description: text("description"),

  credits: int("credits").notNull(),

  capacity: int("capacity").notNull(),

  status: courseStatusEnum.default("ACTIVE").notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),

  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdateFn(() => new Date()),
});
