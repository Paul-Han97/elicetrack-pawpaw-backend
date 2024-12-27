import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1735288722809 implements MigrationInterface {
    name = 'Migration1735288722809'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`review_place_like\` CHANGE \`isLikeCliked\` \`isLikeClicked\` tinyint NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user_board_like\` CHANGE \`isLikeCliked\` \`isLikeClicked\` tinyint NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`notification\` ADD \`chatId\` int NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`notification\` DROP COLUMN \`chatId\``);
        await queryRunner.query(`ALTER TABLE \`user_board_like\` CHANGE \`isLikeClicked\` \`isLikeCliked\` tinyint NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`review_place_like\` CHANGE \`isLikeClicked\` \`isLikeCliked\` tinyint NOT NULL`);
    }
}
