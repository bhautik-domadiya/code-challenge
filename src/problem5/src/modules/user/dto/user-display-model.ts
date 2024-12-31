import { AuditInfo } from "../../../core/audit-info/audit-info";
import { AuditInfoDto } from "../../../core/audit-info/dto/audit-info-dto";
import { UserStatusEnum } from "../../../database/models/users/user.model";

export class UserDisplayModel {
  id: string;

  firstName: string;

  lastName: string;

  email: string;

  phone?: number;

  auditInfo: AuditInfoDto;

  status: UserStatusEnum;
}
