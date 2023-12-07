import { User } from "./user.type";

export type UserAuth = User & {
  passwordHash: string;
}
