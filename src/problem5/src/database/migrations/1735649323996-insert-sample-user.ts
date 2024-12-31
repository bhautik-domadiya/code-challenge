import { MigrationInterface, QueryRunner } from "typeorm";

export class InsertSampleUser1735649323996 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Insert sample user record
    await queryRunner.query(`
        INSERT INTO "users" ("first_name", "last_name", "email", "password", "status")
        VALUES 
        ('admin', 'test', 'admin123@gmail.com', '$2b$10$C7jIhv9ONYJLh/kIEQNq4ebYRVQEh7SeY9FmvPNtyXbNU4jMDU1tu', 'Active');
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Remove inserted user record
    await queryRunner.query(`
        DELETE FROM "users" 
        WHERE "email" = 'admin123@gmail.com';
      `);
  }
}
