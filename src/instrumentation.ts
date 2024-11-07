import { DB } from "./lib/database/db";
import { RollingDeleter } from "./lib/database/RollingDeleter";

export function register() {
  DB.getInstance()
    .init()
    .then(() => {
      RollingDeleter.registerCronJob();
    });
}
