
-- User 
CREATE TABLE `user` (
	`num` INT NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(100) NULL COLLATE 'utf8mb4_0900_ai_ci',
	`email` VARCHAR(100) NULL COLLATE 'utf8mb4_0900_ai_ci',
	`pw` VARCHAR(100) NULL COLLATE 'utf8mb4_0900_ai_ci',
	PRIMARY KEY (`num`) USING BTREE
)
COLLATE='utf8mb4_0900_ai_ci'
ENGINE=InnoDB
;

