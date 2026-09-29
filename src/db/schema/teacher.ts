import {
  mysqlTable,
  varchar,
  mysqlEnum,
  text,
  date,
  timestamp,
} from "drizzle-orm/mysql-core";
import { usersTable } from "./user";

export const teacherGenderEnum = mysqlEnum("teacher_gender", [
  "MALE",
  "FEMALE",
]);

export const teacherStatusEnum = mysqlEnum("teacher_status", [
  "ACTIVE",
  "INACTIVE",
]);

export const teachersTable = mysqlTable("teachers", {
  id: varchar("id", {
    length: 36,
  }).primaryKey(),

  teacherCode: varchar("teacher_code", {
    length: 20,
  })
    .notNull()
    .unique(),

  userId: varchar("user_id", {
    length: 36,
  })
    .unique()
    .references(() => usersTable.id, {
      onDelete: "set null",
    }),

  firstName: varchar("first_name", {
    length: 100,
  }).notNull(),

  lastName: varchar("last_name", {
    length: 100,
  }).notNull(),

  gender: teacherGenderEnum.notNull(),

  email: varchar("email", {
    length: 255,
  })
    .notNull()
    .unique(),

  phone: varchar("phone", {
    length: 20,
  }),

  address: text("address"),

  dateOfBirth: date("date_of_birth"),

  hireDate: date("hire_date").notNull(),

  status: teacherStatusEnum.notNull().default("ACTIVE"),

  createdAt: timestamp("created_at").notNull().defaultNow(),

  updatedAt: timestamp("updated_at").notNull().defaultNow().onUpdateNow(),
});
