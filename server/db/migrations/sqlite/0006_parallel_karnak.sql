ALTER TABLE `bestellingen` ADD `public_id` text;--> statement-breakpoint
CREATE UNIQUE INDEX `bestellingen_public_id_unique` ON `bestellingen` (`public_id`);