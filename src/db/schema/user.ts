import {
  mysqlTable,
  varchar,
  timestamp,
  mysqlEnum,
  boolean,
} from "drizzle-orm/mysql-core";

export const userRoleEnum = mysqlEnum("role", ["ADMIN", "TEACHER", "STUDENT"]);

export const usersTable = mysqlTable("users", {
  id: varchar("id", {
    length: 36,
  }).primaryKey(),

  username: varchar("username", {
    length: 100,
  })
    .notNull()
    .unique(),

  email: varchar("email", {
    length: 255,
  })
    .notNull()
    .unique(),

  password: varchar("password", {
    length: 255,
  }).notNull(),

  role: userRoleEnum.notNull().default("STUDENT"),

  isDeleted: boolean("is_deleted").notNull().default(false),

  createdAt: timestamp("created_at").defaultNow(),

  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});
