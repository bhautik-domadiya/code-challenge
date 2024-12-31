import { orderBy } from "../../../core/query/query-validation-enum";
import { dataSource } from "../../../database/connection/db.connection";
import { User } from "../../../database/models/users/user.model";
import { GetAllUserQuery } from "../dto/get-all-user-query";

export const UserRepository = dataSource.getRepository(User).extend({
  // Get user by userId
  async getById(id: number): Promise<User | null> {
    const user = await this.findOne({
      where: { id },
    });
    if (!user) {
      return null;
    }
    return user;
  },

  // Get user by email
  async getByEmail(email: string): Promise<User | null> {
    const user = await this.findOne({
      where: { email },
    });
    if (!user) {
      return null;
    }
    return user;
  },

  // Get all users
  async getAllUser(query: GetAllUserQuery) {
    let sortBy = "user.created";

    let queryable = this.createQueryBuilder("user");

    if (query) {
      queryable
        .orderBy(sortBy, query.sortOrder || orderBy.DESC)
        .skip(query.skip)
        .take(query.limit);
    }

    return await queryable.getManyAndCount();
  },

  // Save user
  async saveUser(user: User): Promise<User> {
    return this.save(user);
  },
});
