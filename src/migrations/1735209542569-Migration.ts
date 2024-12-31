import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1735209542569 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`INSERT INTO \`gender\` (\`type\`) VALUES ('MALE')`);
        await queryRunner.query(`INSERT INTO \`gender\` (\`type\`) VALUES ('FEMALE')`);
        await queryRunner.query(`INSERT INTO \`role\` (\`type\`) VALUES ('USER')`);
        await queryRunner.query(`INSERT INTO \`role\` (\`type\`) VALUES ('ADMIN')`);
        await queryRunner.query(`INSERT INTO \`login_method\` (\`type\`) VALUES ('BASIC')`);
        await queryRunner.query(`INSERT INTO \`login_method\` (\`type\`) VALUES ('GOOGLE')`);
        await queryRunner.query(`INSERT INTO \`pet_size\` (\`type\`) VALUES ('SMALL')`);
        await queryRunner.query(`INSERT INTO \`pet_size\` (\`type\`) VALUES ('MEDIUM')`);
        await queryRunner.query(`INSERT INTO \`pet_size\` (\`type\`) VALUES ('LARGE')`);
        await queryRunner.query(`INSERT INTO \`board_category\` (\`engName\`, \`korName\`) VALUES ('PROUD_PETS', '펫_자랑')`);
        await queryRunner.query(`INSERT INTO \`board_category\` (\`engName\`, \`korName\`) VALUES ('CONSULTATION', '고민_상담')`);
        await queryRunner.query(`INSERT INTO \`board_category\` (\`engName\`, \`korName\`) VALUES ('PROTECT', '임시_보호')`);
        await queryRunner.query(`INSERT INTO \`board_category\` (\`engName\`, \`korName\`) VALUES ('LIFE', '일상')`);
        await queryRunner.query(`INSERT INTO \`notification_type\` (\`type\`) VALUES ('RECEIVE_MESSAGE')`);
        await queryRunner.query(`INSERT INTO \`notification_type\` (\`type\`) VALUES ('INVITE')`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM \`gender\``);
        await queryRunner.query(`DELETE FROM \`role\``);
        await queryRunner.query(`DELETE FROM \`login_method\``);
        await queryRunner.query(`DELETE FROM \`pet_size\``);
        await queryRunner.query(`DELETE FROM \`board_category\``);
        await queryRunner.query(`DELETE FROM \`notification_type\``);
    }

}
