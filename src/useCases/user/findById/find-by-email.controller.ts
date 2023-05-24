import { BaseController, StatusCode } from "@expressots/core";
import {
  controller,
  httpPost,
  requestBody,
  response,
} from "inversify-express-utils";
import { IFindByIdRequestDTO, IFindByIdResponseDTO } from "./find-by-email.dto";
import { FindByIdUseCase } from "./find-by-email.usecase";

@controller("/user/findById")
export class FindByIdController extends BaseController {
  constructor(private findByIdUseCase: FindByIdUseCase) {
    super("findById-user-controller");
  }

  @httpPost("/")
  async execute(
    @requestBody() data: IFindByIdRequestDTO,
    @response() res: any,
  ): Promise<IFindByIdResponseDTO | null> {
    return this.callUseCaseAsync(
      this.findByIdUseCase.execute(data),
      res,
      StatusCode.Created,
    );
  }
}
