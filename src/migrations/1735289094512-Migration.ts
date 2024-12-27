import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1735289094512 implements MigrationInterface {
    name = 'Migration1735289094512'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`review_place_like\` ADD \`reviewId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`review_place_like\` ADD CONSTRAINT \`FK_ea079df8e0c347773239f98d5f8\` FOREIGN KEY (\`reviewId\`) REFERENCES \`review\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`review_place_like\` DROP FOREIGN KEY \`FK_ea079df8e0c347773239f98d5f8\``);
        await queryRunner.query(`ALTER TABLE \`review_place_like\` DROP COLUMN \`reviewId\``);
    }

}
