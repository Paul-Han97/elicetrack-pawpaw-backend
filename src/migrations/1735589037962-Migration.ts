import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1735589037962 implements MigrationInterface {
    name = 'Migration1735589037962'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`canWalkingMate\` \`canWalkingMate\` tinyint NOT NULL DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`canWalkingMate\` \`canWalkingMate\` tinyint NOT NULL`);
    }

}
