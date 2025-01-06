import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1736066580996 implements MigrationInterface {
    name = 'Migration1736066580996'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`room_user\` DROP FOREIGN KEY \`FK_27dad61266db057665ee1b13d3d\``);
        await queryRunner.query(`ALTER TABLE \`room_user\` DROP COLUMN \`userId\``);
        await queryRunner.query(`ALTER TABLE \`room_user\` ADD \`recipientId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`room_user\` ADD \`senderId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`room_user\` ADD CONSTRAINT \`FK_6033377c7c031af51e6f9aa344e\` FOREIGN KEY (\`recipientId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`room_user\` ADD CONSTRAINT \`FK_166186e4711f550d29dc5306a54\` FOREIGN KEY (\`senderId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`room_user\` DROP FOREIGN KEY \`FK_166186e4711f550d29dc5306a54\``);
        await queryRunner.query(`ALTER TABLE \`room_user\` DROP FOREIGN KEY \`FK_6033377c7c031af51e6f9aa344e\``);
        await queryRunner.query(`ALTER TABLE \`room_user\` DROP COLUMN \`senderId\``);
        await queryRunner.query(`ALTER TABLE \`room_user\` DROP COLUMN \`recipientId\``);
        await queryRunner.query(`ALTER TABLE \`room_user\` ADD \`userId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`room_user\` ADD CONSTRAINT \`FK_27dad61266db057665ee1b13d3d\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
