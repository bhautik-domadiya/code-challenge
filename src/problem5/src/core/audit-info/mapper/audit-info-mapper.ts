import { AuditInfo } from "../audit-info";
import { AuditInfoDto } from "../dto/audit-info-dto";

export class AuditInfoMapper {
  public static toAuditInfoDto(auditInfo: AuditInfo): AuditInfoDto {
    if (!auditInfo) {
      return new AuditInfoDto();
    }
    const dto = new AuditInfoDto();
    dto.createdAt = auditInfo.createdAt;
    dto.updatedAt = auditInfo.updatedAt;
    return dto;
  }
}
