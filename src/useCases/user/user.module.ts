import { CreateModule } from "@expressots/core";
import { CreateUserController } from "./create/create-user.controller";
import { FindByIdController } from "./findById/find-by-email.controller";
import { SignInUserController } from "./signin/signin-user.controller";

export const UserModule = CreateModule([
  CreateUserController,
  SignInUserController,
  FindByIdController,
]);
