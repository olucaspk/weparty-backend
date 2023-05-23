import { AppError, Report, StatusCode } from "@expressots/core";
import { prismaClient } from "@providers/database/prisma-client";
import bcrypt from "bcrypt";
import { provide } from "inversify-binding-decorators";
import { ZodError } from "utils";
import { z } from "zod";
import {
  ICreateUserRequestDTO,
  ICreateUserResponseDTO,
} from "./create-user.dto";

@provide(CreateUserUseCase)
export class CreateUserUseCase {
  async execute(
    data: ICreateUserRequestDTO,
  ): Promise<ICreateUserResponseDTO | null> {
    const schema = z.object({
      name: z.string(),
      lastname: z.string(),
      dob: z.string(),
      email: z.string(),
      phone: z.string(),
      password: z.string(),
    });

    const result = schema.safeParse(data);

    if (!result.success) {
      ZodError(result, "create-user-usecase");
      return null;
    }

    const userExists = await prismaClient.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (userExists) {
      Report.Error(
        new AppError(
          StatusCode.Conflict,
          "User already exists",
          "create-user-usecase",
        ),
      );
      return null;
    }

    const passwordHash = await bcrypt.hash(data.password, 5);
    await prismaClient.user.create({
      data: {
        name: data.name,
        lastname: data.lastname,
        dob: data.dob,
        email: data.email,
        phone: data.phone,
        passwordHash,
      },
    });

    // const jwtToken = jwt.sign(
    //   {
    //     id: user.id,
    //     role: user.role,
    //   },
    //   ENV.Jwt.PASS,
    //   { expiresIn: 60 },
    // );

    return {
      status: "ok",
    };
  }
}
