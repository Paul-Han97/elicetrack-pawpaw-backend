import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1735436341730 implements MigrationInterface {
    name = 'Migration1735436341730'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`walkMate\` \`canWalkingMate\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`canWalkingMate\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`canWalkingMate\` tinyint NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`canWalkingMate\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`canWalkingMate\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`canWalkingMate\` \`walkMate\` varchar(255) NOT NULL`);
    }

}
