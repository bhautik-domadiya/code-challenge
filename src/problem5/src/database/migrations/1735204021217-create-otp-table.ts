import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateOtpTable1735204021217 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "otps" (
              "id" SERIAL PRIMARY KEY,
              "otp" VARCHAR(4) NOT NULL,
              "otp_expires_at" TIMESTAMP NOT NULL,
              "token" VARCHAR(255),
              "token_expires_at" TIMESTAMP,
              "email" VARCHAR(100) NOT NULL
            );
          `);
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "otps";`);
  }
}
