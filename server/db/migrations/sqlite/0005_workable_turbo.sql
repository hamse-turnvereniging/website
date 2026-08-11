ALTER TABLE `inschrijvingen` ADD `public_id` text;--> statement-breakpoint
CREATE UNIQUE INDEX `inschrijvingen_public_id_unique` ON `inschrijvingen` (`public_id`);