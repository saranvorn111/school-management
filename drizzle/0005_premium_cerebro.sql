CREATE TABLE `teachers` (
	`id` varchar(36) NOT NULL,
	`teacher_code` varchar(20) NOT NULL,
	`user_id` varchar(36),
	`first_name` varchar(100) NOT NULL,
	`last_name` varchar(100) NOT NULL,
	`teacher_gender` enum('MALE','FEMALE') NOT NULL,
	`email` varchar(255) NOT NULL,
	`phone` varchar(20),
	`address` text,
	`date_of_birth` date,
	`hire_date` date NOT NULL,
	`teacher_status` enum('ACTIVE','INACTIVE') NOT NULL DEFAULT 'ACTIVE',
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `teachers_id` PRIMARY KEY(`id`),
	CONSTRAINT `teachers_teacher_code_unique` UNIQUE(`teacher_code`),
	CONSTRAINT `teachers_user_id_unique` UNIQUE(`user_id`),
	CONSTRAINT `teachers_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
ALTER TABLE `teachers` ADD CONSTRAINT `teachers_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE set null ON UPDATE no action;