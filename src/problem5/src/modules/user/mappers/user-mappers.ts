import { AuditInfoMapper } from "../../../core/audit-info/mapper/audit-info-mapper";
import {
  User,
  UserStatusEnum,
} from "../../../database/models/users/user.model";
import { RegisterDTO } from "../../auth/dto/register-user.dto";
import { UserDisplayModel } from "../dto/user-display-model";

export class UserMapper {
  public static toDisplay(UserEntity: User) {
    const User = new UserDisplayModel();
    User.id = UserEntity.id.toString();
    User.firstName = UserEntity.firstName;
    User.lastName = UserEntity.lastName;
    User.email = UserEntity.email;
    User.status = UserEntity.status;
    User.auditInfo = AuditInfoMapper.toAuditInfoDto(UserEntity.auditInfo);
    return User;
  }

  public static toUserDisplayList(User: User[]): UserDisplayModel[] {
    if (!User || !User.length) {
      return [];
    }
    return User.map((user) => {
      return this.toDisplay(user);
    });
  }

  // User Model Object Creation
  public static toUserModel(createUserDTO: RegisterDTO): User {
    const user = new User({
      ...createUserDTO,
      status: UserStatusEnum.Active,
    });
    return user;
  }
}
