import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTaskTable1735624819436 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE tasks (
                id SERIAL PRIMARY KEY,                   
                title VARCHAR(255) NOT NULL,           
                description TEXT,                        
                status VARCHAR(50) DEFAULT 'pending',
                priority VARCHAR(20) DEFAULT 'medium',
                due_date DATE,     
                assigned_to VARCHAR(50),                                      
                "created" TIMESTAMP NOT NULL DEFAULT NOW(),
                "modified" TIMESTAMP NOT NULL DEFAULT NOW(),
                "deleted_at" TIMESTAMP                
            );
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP TABLE tasks;
    `);
  }
}
