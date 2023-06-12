import { faker } from "@faker-js/faker";
import {
  AdminUserModel,
  IAdminUserEntity,
} from "../Database/Entities/AdminUserEntity";
import { IUserEntity, UserModel } from "../Database/Entities/UserEntity";
import { StringUtils } from "../Utils/StringUtils";
export class FakeModels {
  public adminUser(): IAdminUserEntity {
    return new (AdminUserModel())({
      emailId: faker.internet.email(),
      passwordHash: faker.datatype.string(),
      userName: faker.internet.userName(),
      createdAt: faker.date.past(),
      updatedAt: faker.date.past(),
    });
  }

  public user(): IUserEntity {
    return new (UserModel())({
      emailId: faker.internet.email(),
      passwordHash: StringUtils.toBase64String(faker.datatype.string()),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      userName: faker.internet.userName(),
      createdAt: faker.date.past(),
      updatedAt: faker.date.past(),
    });
  }
}
