CREATE TABLE `students` (
	`id` varchar(36) NOT NULL,
	`user_id` varchar(36) NOT NULL,
	`student_code` varchar(50) NOT NULL,
	`first_name` varchar(100) NOT NULL,
	`last_name` varchar(100) NOT NULL,
	`age` int,
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `students_id` PRIMARY KEY(`id`),
	CONSTRAINT `students_student_code_unique` UNIQUE(`student_code`)
);
