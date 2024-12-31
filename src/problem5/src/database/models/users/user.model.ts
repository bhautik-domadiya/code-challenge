import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
} from "typeorm";
import * as bcrypt from "bcrypt";
import { TokenProvider } from "../../../utils/helpers/token.provider";
import { AuditInfo } from "../../../core/audit-info/audit-info";

const tokenProvider = new TokenProvider();

export enum UserStatusEnum {
  Active = "Active",
  Blocked = "Blocked",
}

interface UserParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  status: UserStatusEnum;
}

@Entity("users") // Table name
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "character varying", name: "first_name", length: 255 })
  firstName: string;

  @Column({ type: "character varying", name: "last_name", length: 255 })
  lastName: string;

  @Column({
    type: "character varying",
    name: "email",
    length: 255,
    unique: true,
  })
  email: string;

  @Column({ type: "character varying", name: "password", length: 255 })
  password: string;

  @Column({
    name: "status",
    type: "enum",
    enum: UserStatusEnum,
    default: UserStatusEnum.Active,
  })
  status: UserStatusEnum;

  @Column(() => AuditInfo, { prefix: false })
  auditInfo: AuditInfo;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    }
  }

  async isPasswordCorrect(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }

  async generateAccessToken(): Promise<string> {
    return tokenProvider.createAccessToken({ sub: this.id });
  }

  async generateRefreshToken(): Promise<string> {
    return tokenProvider.createRefreshToken({ sub: this.id });
  }

  constructor(param: UserParams) {
    super();
    if (param) {
      this.firstName = param.firstName;
      this.lastName = param.lastName;
      this.email = param.email;
      this.password = param.password;
      this.status = param.status;
    }
  }
}

// export class NullUser extends User {
//   constructor() {
//     super({
//       firstName: null,
//       // email: null,
//       // last Name: null,
//       // password: null,
//     });
//   }
// }
