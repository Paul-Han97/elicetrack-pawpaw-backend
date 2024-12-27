import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1735201659305 implements MigrationInterface {
    name = 'Migration1735201659305'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`gender\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdUser\` varchar(255) NULL DEFAULT 'PawPaw', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedUser\` varchar(255) NULL, \`updatedAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`type\` varchar(6) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`pet_size\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdUser\` varchar(255) NULL DEFAULT 'PawPaw', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedUser\` varchar(255) NULL, \`updatedAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`type\` varchar(6) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`comment\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdUser\` varchar(255) NULL DEFAULT 'PawPaw', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedUser\` varchar(255) NULL, \`updatedAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`content\` varchar(255) NOT NULL, \`userId\` int NULL, \`boardId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`login_method\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdUser\` varchar(255) NULL DEFAULT 'PawPaw', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedUser\` varchar(255) NULL, \`updatedAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`type\` varchar(6) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`credential\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdUser\` varchar(255) NULL DEFAULT 'PawPaw', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedUser\` varchar(255) NULL, \`updatedAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`username\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`userId\` int NULL, \`loginMethodId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`notification_type\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdUser\` varchar(255) NULL DEFAULT 'PawPaw', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedUser\` varchar(255) NULL, \`updatedAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`type\` varchar(15) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`notification\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdUser\` varchar(255) NULL DEFAULT 'PawPaw', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedUser\` varchar(255) NULL, \`updatedAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`isRead\` tinyint NOT NULL, \`userId\` int NULL, \`notificationTypeId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_location\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdUser\` varchar(255) NULL DEFAULT 'PawPaw', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedUser\` varchar(255) NULL, \`updatedAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`userId\` int NULL, \`locationId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`location\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdUser\` varchar(255) NULL DEFAULT 'PawPaw', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedUser\` varchar(255) NULL, \`updatedAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`point\` point NOT NULL, SPATIAL INDEX \`IDX_ba94dcfa1b352b0495b55ac3e0\` (\`point\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`place_location\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdUser\` varchar(255) NULL DEFAULT 'PawPaw', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedUser\` varchar(255) NULL, \`updatedAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`locationId\` int NULL, \`placeId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`review_place_like\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdUser\` varchar(255) NULL DEFAULT 'PawPaw', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedUser\` varchar(255) NULL, \`updatedAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`isLikeCliked\` tinyint NOT NULL, \`placeId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`place\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdUser\` varchar(255) NULL DEFAULT 'PawPaw', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedUser\` varchar(255) NULL, \`updatedAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`name\` varchar(255) NULL, \`category\` varchar(255) NULL, \`postalCode\` varchar(255) NULL, \`roadNameAddress\` varchar(255) NULL, \`postalAddress\` varchar(255) NULL, \`contact\` varchar(255) NULL, \`closingDays\` varchar(255) NULL, \`openingHour\` varchar(255) NULL, \`hasParkingArea\` tinyint NULL, \`price\` varchar(255) NULL, \`allowSize\` varchar(255) NULL, \`restrictions\` varchar(255) NULL, \`description\` varchar(255) NULL, \`additionalFees\` varchar(255) NULL, \`lastUpdate\` datetime NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`review\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdUser\` varchar(255) NULL DEFAULT 'PawPaw', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedUser\` varchar(255) NULL, \`updatedAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`title\` varchar(255) NOT NULL, \`content\` varchar(255) NOT NULL, \`userId\` int NULL, \`placeId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`role\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdUser\` varchar(255) NULL DEFAULT 'PawPaw', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedUser\` varchar(255) NULL, \`updatedAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`type\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`room_user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdUser\` varchar(255) NULL DEFAULT 'PawPaw', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedUser\` varchar(255) NULL, \`updatedAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`roomId\` varchar(255) NOT NULL, \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_board_like\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdUser\` varchar(255) NULL DEFAULT 'PawPaw', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedUser\` varchar(255) NULL, \`updatedAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`isLikeCliked\` tinyint NOT NULL, \`userId\` int NULL, \`boardId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_image\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdUser\` varchar(255) NULL DEFAULT 'PawPaw', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedUser\` varchar(255) NULL, \`updatedAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`userId\` int NULL, \`imageId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdUser\` varchar(255) NULL DEFAULT 'PawPaw', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedUser\` varchar(255) NULL, \`updatedAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`name\` varchar(255) NOT NULL, \`nickname\` varchar(255) NOT NULL, \`walkMate\` varchar(255) NOT NULL, \`roleId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`pet\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdUser\` varchar(255) NULL DEFAULT 'PawPaw', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedUser\` varchar(255) NULL, \`updatedAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`age\` int NOT NULL, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`userId\` int NULL, \`genderId\` int NULL, \`petSizeId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`pet_image\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdUser\` varchar(255) NULL DEFAULT 'PawPaw', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedUser\` varchar(255) NULL, \`updatedAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`imageId\` int NULL, \`petId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`image\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdUser\` varchar(255) NULL DEFAULT 'PawPaw', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedUser\` varchar(255) NULL, \`updatedAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`url\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`board_image\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdUser\` varchar(255) NULL DEFAULT 'PawPaw', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedUser\` varchar(255) NULL, \`updatedAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`isPrimary\` tinyint NOT NULL, \`imageId\` int NULL, \`boardId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`board\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdUser\` varchar(255) NULL DEFAULT 'PawPaw', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedUser\` varchar(255) NULL, \`updatedAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`title\` varchar(255) NOT NULL, \`content\` varchar(255) NOT NULL, \`userId\` int NULL, \`boardCategoryId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`board_category\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdUser\` varchar(255) NULL DEFAULT 'PawPaw', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedUser\` varchar(255) NULL, \`updatedAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`engName\` varchar(255) NOT NULL, \`korName\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`comment\` ADD CONSTRAINT \`FK_c0354a9a009d3bb45a08655ce3b\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`comment\` ADD CONSTRAINT \`FK_a13ed8d4be35dee61bd3286ac12\` FOREIGN KEY (\`boardId\`) REFERENCES \`board\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`credential\` ADD CONSTRAINT \`FK_51dc2344d47cea3102674c64963\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`credential\` ADD CONSTRAINT \`FK_95c95840bc596b2a61a0b0f837b\` FOREIGN KEY (\`loginMethodId\`) REFERENCES \`login_method\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`notification\` ADD CONSTRAINT \`FK_1ced25315eb974b73391fb1c81b\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`notification\` ADD CONSTRAINT \`FK_f86e31436f538bc4face386f39b\` FOREIGN KEY (\`notificationTypeId\`) REFERENCES \`notification_type\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_location\` ADD CONSTRAINT \`FK_2ba84b10be101377e01f153ecc8\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_location\` ADD CONSTRAINT \`FK_a91360fae2a8d3003cb2a1188d5\` FOREIGN KEY (\`locationId\`) REFERENCES \`location\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`place_location\` ADD CONSTRAINT \`FK_621a3fdf1043c494418a1daea9e\` FOREIGN KEY (\`locationId\`) REFERENCES \`location\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`place_location\` ADD CONSTRAINT \`FK_28230ed88681f313a651c7dace2\` FOREIGN KEY (\`placeId\`) REFERENCES \`place\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`review_place_like\` ADD CONSTRAINT \`FK_85b8c7c28937cc631bca1ecba6f\` FOREIGN KEY (\`placeId\`) REFERENCES \`place\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`review\` ADD CONSTRAINT \`FK_1337f93918c70837d3cea105d39\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`review\` ADD CONSTRAINT \`FK_ec8f295224c904bded4ddfd9ec6\` FOREIGN KEY (\`placeId\`) REFERENCES \`place\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`room_user\` ADD CONSTRAINT \`FK_27dad61266db057665ee1b13d3d\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_board_like\` ADD CONSTRAINT \`FK_ce930760988379cd189cb7d8989\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_board_like\` ADD CONSTRAINT \`FK_4fdc2b29b6a0965cf36e53c4f22\` FOREIGN KEY (\`boardId\`) REFERENCES \`board\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_image\` ADD CONSTRAINT \`FK_bbbdf8daa06964389b3f90b9c2b\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_image\` ADD CONSTRAINT \`FK_f12654727f1c6616ee50d84b234\` FOREIGN KEY (\`imageId\`) REFERENCES \`image\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_c28e52f758e7bbc53828db92194\` FOREIGN KEY (\`roleId\`) REFERENCES \`role\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`pet\` ADD CONSTRAINT \`FK_4eb3b1eeefc7cdeae09f934f479\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`pet\` ADD CONSTRAINT \`FK_ed523b848340651693c88b160a5\` FOREIGN KEY (\`genderId\`) REFERENCES \`gender\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`pet\` ADD CONSTRAINT \`FK_5a6cc5e7e004716258e7510aef3\` FOREIGN KEY (\`petSizeId\`) REFERENCES \`pet_size\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`pet_image\` ADD CONSTRAINT \`FK_6162c6b84151bd1c02805d5ed0b\` FOREIGN KEY (\`imageId\`) REFERENCES \`image\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`pet_image\` ADD CONSTRAINT \`FK_9bf1ffb0dcd2b2fcc22556a42d9\` FOREIGN KEY (\`petId\`) REFERENCES \`pet\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`board_image\` ADD CONSTRAINT \`FK_eb286b7afccc7f1684b2953f6f6\` FOREIGN KEY (\`imageId\`) REFERENCES \`image\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`board_image\` ADD CONSTRAINT \`FK_c3d7b1296a26bdced88118751eb\` FOREIGN KEY (\`boardId\`) REFERENCES \`board\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`board\` ADD CONSTRAINT \`FK_c9951f13af7909d37c0e2aec484\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`board\` ADD CONSTRAINT \`FK_41bbb581d855425b352f1c87f65\` FOREIGN KEY (\`boardCategoryId\`) REFERENCES \`board_category\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`board\` DROP FOREIGN KEY \`FK_41bbb581d855425b352f1c87f65\``);
        await queryRunner.query(`ALTER TABLE \`board\` DROP FOREIGN KEY \`FK_c9951f13af7909d37c0e2aec484\``);
        await queryRunner.query(`ALTER TABLE \`board_image\` DROP FOREIGN KEY \`FK_c3d7b1296a26bdced88118751eb\``);
        await queryRunner.query(`ALTER TABLE \`board_image\` DROP FOREIGN KEY \`FK_eb286b7afccc7f1684b2953f6f6\``);
        await queryRunner.query(`ALTER TABLE \`pet_image\` DROP FOREIGN KEY \`FK_9bf1ffb0dcd2b2fcc22556a42d9\``);
        await queryRunner.query(`ALTER TABLE \`pet_image\` DROP FOREIGN KEY \`FK_6162c6b84151bd1c02805d5ed0b\``);
        await queryRunner.query(`ALTER TABLE \`pet\` DROP FOREIGN KEY \`FK_5a6cc5e7e004716258e7510aef3\``);
        await queryRunner.query(`ALTER TABLE \`pet\` DROP FOREIGN KEY \`FK_ed523b848340651693c88b160a5\``);
        await queryRunner.query(`ALTER TABLE \`pet\` DROP FOREIGN KEY \`FK_4eb3b1eeefc7cdeae09f934f479\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_c28e52f758e7bbc53828db92194\``);
        await queryRunner.query(`ALTER TABLE \`user_image\` DROP FOREIGN KEY \`FK_f12654727f1c6616ee50d84b234\``);
        await queryRunner.query(`ALTER TABLE \`user_image\` DROP FOREIGN KEY \`FK_bbbdf8daa06964389b3f90b9c2b\``);
        await queryRunner.query(`ALTER TABLE \`user_board_like\` DROP FOREIGN KEY \`FK_4fdc2b29b6a0965cf36e53c4f22\``);
        await queryRunner.query(`ALTER TABLE \`user_board_like\` DROP FOREIGN KEY \`FK_ce930760988379cd189cb7d8989\``);
        await queryRunner.query(`ALTER TABLE \`room_user\` DROP FOREIGN KEY \`FK_27dad61266db057665ee1b13d3d\``);
        await queryRunner.query(`ALTER TABLE \`review\` DROP FOREIGN KEY \`FK_ec8f295224c904bded4ddfd9ec6\``);
        await queryRunner.query(`ALTER TABLE \`review\` DROP FOREIGN KEY \`FK_1337f93918c70837d3cea105d39\``);
        await queryRunner.query(`ALTER TABLE \`review_place_like\` DROP FOREIGN KEY \`FK_85b8c7c28937cc631bca1ecba6f\``);
        await queryRunner.query(`ALTER TABLE \`place_location\` DROP FOREIGN KEY \`FK_28230ed88681f313a651c7dace2\``);
        await queryRunner.query(`ALTER TABLE \`place_location\` DROP FOREIGN KEY \`FK_621a3fdf1043c494418a1daea9e\``);
        await queryRunner.query(`ALTER TABLE \`user_location\` DROP FOREIGN KEY \`FK_a91360fae2a8d3003cb2a1188d5\``);
        await queryRunner.query(`ALTER TABLE \`user_location\` DROP FOREIGN KEY \`FK_2ba84b10be101377e01f153ecc8\``);
        await queryRunner.query(`ALTER TABLE \`notification\` DROP FOREIGN KEY \`FK_f86e31436f538bc4face386f39b\``);
        await queryRunner.query(`ALTER TABLE \`notification\` DROP FOREIGN KEY \`FK_1ced25315eb974b73391fb1c81b\``);
        await queryRunner.query(`ALTER TABLE \`credential\` DROP FOREIGN KEY \`FK_95c95840bc596b2a61a0b0f837b\``);
        await queryRunner.query(`ALTER TABLE \`credential\` DROP FOREIGN KEY \`FK_51dc2344d47cea3102674c64963\``);
        await queryRunner.query(`ALTER TABLE \`comment\` DROP FOREIGN KEY \`FK_a13ed8d4be35dee61bd3286ac12\``);
        await queryRunner.query(`ALTER TABLE \`comment\` DROP FOREIGN KEY \`FK_c0354a9a009d3bb45a08655ce3b\``);
        await queryRunner.query(`DROP TABLE \`board_category\``);
        await queryRunner.query(`DROP TABLE \`board\``);
        await queryRunner.query(`DROP TABLE \`board_image\``);
        await queryRunner.query(`DROP TABLE \`image\``);
        await queryRunner.query(`DROP TABLE \`pet_image\``);
        await queryRunner.query(`DROP TABLE \`pet\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP TABLE \`user_image\``);
        await queryRunner.query(`DROP TABLE \`user_board_like\``);
        await queryRunner.query(`DROP TABLE \`room_user\``);
        await queryRunner.query(`DROP TABLE \`role\``);
        await queryRunner.query(`DROP TABLE \`review\``);
        await queryRunner.query(`DROP TABLE \`place\``);
        await queryRunner.query(`DROP TABLE \`review_place_like\``);
        await queryRunner.query(`DROP TABLE \`place_location\``);
        await queryRunner.query(`DROP INDEX \`IDX_ba94dcfa1b352b0495b55ac3e0\` ON \`location\``);
        await queryRunner.query(`DROP TABLE \`location\``);
        await queryRunner.query(`DROP TABLE \`user_location\``);
        await queryRunner.query(`DROP TABLE \`notification\``);
        await queryRunner.query(`DROP TABLE \`notification_type\``);
        await queryRunner.query(`DROP TABLE \`credential\``);
        await queryRunner.query(`DROP TABLE \`login_method\``);
        await queryRunner.query(`DROP TABLE \`comment\``);
        await queryRunner.query(`DROP TABLE \`pet_size\``);
        await queryRunner.query(`DROP TABLE \`gender\``);
    }

}
