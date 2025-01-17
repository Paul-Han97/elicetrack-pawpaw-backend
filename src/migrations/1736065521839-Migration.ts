import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1736065521839 implements MigrationInterface {
    name = 'Migration1736065521839'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`room_user\` CHANGE \`roomId\` \`roomName\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`room_user\` DROP COLUMN \`roomName\``);
        await queryRunner.query(`ALTER TABLE \`room_user\` ADD \`roomName\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`canWalkingMate\` \`canWalkingMate\` tinyint NOT NULL DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`canWalkingMate\` \`canWalkingMate\` tinyint NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`room_user\` DROP COLUMN \`roomName\``);
        await queryRunner.query(`ALTER TABLE \`room_user\` ADD \`roomName\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`room_user\` CHANGE \`roomName\` \`roomId\` varchar(255) NOT NULL`);
    }

}
