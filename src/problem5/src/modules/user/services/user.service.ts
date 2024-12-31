import { ExpressError } from "../../../utils/errors/express.error";
import { ErrorCategories } from "../../../utils/errors/erorr-catagories";
import { BaseCollection } from "../../../utils/collections/base-collection";
import { UserMapper } from "../mappers/user-mappers";
import { GetAllUserQuery } from "../dto/get-all-user-query";
import { logger } from "../../../utils/logger/logger";
import { UserRepository } from "../repositories/user-repository";

export enum UserErrorCodeEnum {
  ErrorUserValidation = "ERR_USER_VALIDATION",
  ErrorListingUsers = "ERR_USER_LIST",
  ErrorUserNotFound = "ERR_USER_NOT_FOUND",
  ErrorUpdateUser = "ERR_USER_UPDATE",
}

export class UserService {
  expressError: ExpressError;

  constructor() {
    // Error Class initialization
    this.expressError = new ExpressError(ErrorCategories.User);
  }

  // Service for get all active Users
  public async getAllUsers(query: GetAllUserQuery) {
    try {
      logger.info(`User : Start executing get all users with query : ${query}`);

      const [users, total] = await UserRepository.getAllUser(query);

      logger.info(`User : successfully get all users with query : ${query}`);
      return new BaseCollection(UserMapper.toUserDisplayList(users), total);
    } catch (error) {
      return this.expressError.updateError(
        UserErrorCodeEnum.ErrorListingUsers,
        `There was an error in retrieving Users`
      );
    }
  }
}
