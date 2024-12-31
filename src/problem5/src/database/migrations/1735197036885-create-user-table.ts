import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserTable1735197036885 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE "users" (
          "id" SERIAL PRIMARY KEY,
          "first_name" VARCHAR(255) NOT NULL,
          "last_name" VARCHAR(255) NOT NULL,
          "email" VARCHAR(255) UNIQUE NOT NULL,
          "password" VARCHAR(255) NOT NULL,
          "status" VARCHAR(20) NOT NULL,
          "created" TIMESTAMP NOT NULL DEFAULT NOW(),
          "modified" TIMESTAMP NOT NULL DEFAULT NOW(),
          "deleted_at" TIMESTAMP
        );
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user";`);
  }
}
