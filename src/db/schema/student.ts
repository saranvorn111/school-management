import { mysqlTable, varchar, timestamp, int } from "drizzle-orm/mysql-core";

export const studentsTable = mysqlTable("students", {
  id: varchar("id", { length: 36 }).primaryKey(),

  userId: varchar("user_id", { length: 36 }).notNull(),

  studentCode: varchar("student_code", {
    length: 50,
  })
    .notNull()
    .unique(),

  firstName: varchar("first_name", {
    length: 100,
  }).notNull(),

  lastName: varchar("last_name", {
    length: 100,
  }).notNull(),

  age: int("age"),

  createdAt: timestamp("created_at").defaultNow(),
});
