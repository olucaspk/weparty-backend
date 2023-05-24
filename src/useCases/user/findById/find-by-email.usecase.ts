import { AppError, Report, StatusCode } from "@expressots/core";
import { prismaClient } from "@providers/database/prisma-client";
import { provide } from "inversify-binding-decorators";
import { ZodError } from "utils";
import { z } from "zod";
import { IFindByIdRequestDTO, IFindByIdResponseDTO } from "./find-by-email.dto";

@provide(FindByIdUseCase)
export class FindByIdUseCase {
  async execute(
    data: IFindByIdRequestDTO,
  ): Promise<IFindByIdResponseDTO | null> {
    const schema = z.object({
      id: z.string(),
    });

    const result = schema.safeParse(data);

    if (!result.success) {
      ZodError(result, "user-find-by-id-usecase");
      return null;
    }

    const user = await prismaClient.user.findUnique({
      where: {
        id: data.id,
      },
    });

    if (!user) {
      Report.Error(
        new AppError(
          StatusCode.BadRequest,
          "Usuário não encontrado",
          "user-find-by-id-usecase",
        ),
      );
      return null;
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name + " " + user.lastname,
      role: user.role,
    };
  }
}
