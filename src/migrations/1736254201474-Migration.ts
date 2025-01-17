import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1736254201474 implements MigrationInterface {
    name = 'Migration1736254201474'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`notification\` ADD \`senderId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`notification\` ADD CONSTRAINT \`FK_c0af34102c13c654955a0c5078b\` FOREIGN KEY (\`senderId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`notification\` DROP FOREIGN KEY \`FK_c0af34102c13c654955a0c5078b\``);
        await queryRunner.query(`ALTER TABLE \`notification\` DROP COLUMN \`senderId\``);
    }

}
