import { CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm";

export class AuditInfo {
  @CreateDateColumn({ type: "timestamptz", name: "created" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamptz", name: "modified" })
  updatedAt: Date;

  @DeleteDateColumn({ type: "timestamptz", name: "deleted_at" })
  deletedAt: Date;

  constructor(createdBy?: string) {
    if (createdBy) {
      this.createdAt = new Date();
      this.updatedAt = new Date();
    } else {
      this.updatedAt = new Date();
    }
  }
}
