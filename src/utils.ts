import { AppError, Report, StatusCode } from "@expressots/core";

export function ZodError(result: any, origin: string) {
  Report.Error(
    new AppError(
      StatusCode.BadRequest,
      result.error.issues
        .map((issue) => `${issue.path}: ${issue.message}`)
        .join(". "),
      origin,
    ),
  );
}
