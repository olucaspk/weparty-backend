import { BaseController, StatusCode } from "@expressots/core";
import {
  controller,
  httpPost,
  requestBody,
  response,
} from "inversify-express-utils";
import {
  ISignInUserRequestDTO,
  ISignInUserResponseDTO,
} from "./signin-user.dto";
import { SignInUserUseCase } from "./signin-user.usecase";

@controller("/user/signin")
export class SignInUserController extends BaseController {
  constructor(private signinUserUseCase: SignInUserUseCase) {
    super("signin-user-controller");
  }

  @httpPost("/")
  async execute(
    @requestBody() data: ISignInUserRequestDTO,
    @response() res: any,
  ): Promise<ISignInUserResponseDTO | null> {
    return this.callUseCaseAsync(
      this.signinUserUseCase.execute(data),
      res,
      StatusCode.Created,
    );
  }
}
