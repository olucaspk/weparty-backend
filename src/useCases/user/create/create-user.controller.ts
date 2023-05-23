import { BaseController, StatusCode } from "@expressots/core";
import {
  controller,
  httpPost,
  requestBody,
  response,
} from "inversify-express-utils";
import {
  ICreateUserRequestDTO,
  ICreateUserResponseDTO,
} from "./create-user.dto";
import { CreateUserUseCase } from "./create-user.usecase";

@controller("/user/create")
export class CreateUserController extends BaseController {
  constructor(private createUserUseCase: CreateUserUseCase) {
    super("create-user-controller");
  }

  @httpPost("/")
  async execute(
    @requestBody() data: ICreateUserRequestDTO,
    @response() res: any,
  ): Promise<ICreateUserResponseDTO | null> {
    return this.callUseCaseAsync(
      this.createUserUseCase.execute(data),
      res,
      StatusCode.Created,
    );
  }
}
