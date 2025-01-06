import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1736074012154 implements MigrationInterface {
    name = 'Migration1736074012154'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`notification\` DROP FOREIGN KEY \`FK_1ced25315eb974b73391fb1c81b\``);
        await queryRunner.query(`ALTER TABLE \`notification\` DROP COLUMN \`userId\``);
        await queryRunner.query(`ALTER TABLE \`notification\` ADD \`recipientId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`notification\` CHANGE \`chatId\` \`chatId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`notification\` ADD CONSTRAINT \`FK_ab7cbe7a013ecac5da0a8f88884\` FOREIGN KEY (\`recipientId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`notification\` DROP FOREIGN KEY \`FK_ab7cbe7a013ecac5da0a8f88884\``);
        await queryRunner.query(`ALTER TABLE \`notification\` CHANGE \`chatId\` \`chatId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`notification\` DROP COLUMN \`recipientId\``);
        await queryRunner.query(`ALTER TABLE \`notification\` ADD \`userId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`notification\` ADD CONSTRAINT \`FK_1ced25315eb974b73391fb1c81b\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
