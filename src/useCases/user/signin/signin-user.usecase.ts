import { AppError, Report, StatusCode } from "@expressots/core";
import { prismaClient } from "@providers/database/prisma-client";
import bcrypt from "bcrypt";
import ENV from "env";
import { provide } from "inversify-binding-decorators";
import jwt from "jsonwebtoken";
import { ZodError } from "utils";
import { z } from "zod";
import {
  ISignInUserRequestDTO,
  ISignInUserResponseDTO,
} from "./signin-user.dto";

@provide(SignInUserUseCase)
export class SignInUserUseCase {
  async execute(
    data: ISignInUserRequestDTO,
  ): Promise<ISignInUserResponseDTO | null> {
    const schema = z.object({
      email: z.string(),
      password: z.string(),
    });

    const result = schema.safeParse(data);

    if (!result.success) {
      ZodError(result, "create-user-usecase");
      return null;
    }

    const user = await prismaClient.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (!user) {
      Report.Error(
        new AppError(
          StatusCode.BadRequest,
          "Verifique suas credenciais e tente novamente",
          "create-user-usecase",
        ),
      );
      return null;
    }

    const isPasswordEqual = await bcrypt.compare(
      data.password,
      user.passwordHash,
    );

    if (!isPasswordEqual) {
      Report.Error(
        new AppError(
          StatusCode.BadRequest,
          "Email or password incorrect",
          "create-user-usecase",
        ),
      );
      return null;
    }

    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      ENV.Jwt.PASS,
      { expiresIn: 60 },
    );

    return {
      token,
    };
  }
}
