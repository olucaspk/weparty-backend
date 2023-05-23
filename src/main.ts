import "reflect-metadata";

import { ServerEnvironment } from "@expressots/core";
import { App } from "@providers/application/application";
import { container } from "app-container";
import cors from "cors";
import express from "express";
import ENV from "./env";

async function Bootstrap() {
  const app = App.create(container, [
    express.json(),
    express.urlencoded({ extended: true }),
    cors({ origin: "*" }),
  ]);
  app.listen(
    ENV.Application.PORT,
    ServerEnvironment[ENV.Application.ENVIRONMENT],
    {
      appName: ENV.Application.APP_NAME,
      appVersion: ENV.Application.APP_VERSION,
    },
  );
}

Bootstrap();
