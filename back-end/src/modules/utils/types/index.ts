import { User } from "../../users/entity/user.entity";

export type UserRoleType = "Broker" | "Costumer";
export enum UserRoleEnum {
  "Broker",
  "Costumer",
}

export type TokenPayload = {
  email: string;
  name: string;
  role: UserRoleType;
};

export type TokenObject = {
  accessToken: string;
  tokenType: string;
  expiresIn: string;
  user: TokenPayload;
};

export type CreatedUser = Pick<User, "idUser" | "name" | "email" | "role">;
