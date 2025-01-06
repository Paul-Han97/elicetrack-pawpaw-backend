import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1736068673873 implements MigrationInterface {
    name = 'Migration1736068673873'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`notification\` ADD \`roomName\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`notification\` DROP COLUMN \`roomName\``);
    }

}
