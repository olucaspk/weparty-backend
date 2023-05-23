import { AppContainer } from "@expressots/core";
import { UserModule } from "@useCases/user/user.module";

const appContainer = new AppContainer();

const container = appContainer.create([UserModule]);

export { container };
