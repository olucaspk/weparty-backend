import { CreateModule } from "@expressots/core";
import { CreateUserController } from "./create/create-user.controller";
import { SignInUserController } from "./signin/signin-user.controller";

export const UserModule = CreateModule([
  CreateUserController,
  SignInUserController,
]);
