import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1737046724463 implements MigrationInterface {
    name = 'Migration1737046724463'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`clientId\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`clientId\``);
    }

}
