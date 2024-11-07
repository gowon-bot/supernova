import { Prisma } from "@prisma/client";
import { DB } from "./db";

export abstract class RollingDeleter {
  private static readonly DELETE_THRESHOLD = "2 MONTHS";
  private static readonly RUN_INTERVAL = 1000 * 60 * 60 * 24; // 24 hours
  private static isRunning = false;
  private static interval?: NodeJS.Timeout;

  public static registerCronJob() {
    this.interval = setInterval(() => {
      this.deleteOldErrors();
    }, this.RUN_INTERVAL);
  }

  public static async deleteOldErrors() {
    if (this.isRunning) {
      this.interval && clearInterval(this.interval);
      throw new RollingDeleteTookTooLongError();
    }

    this.isRunning = true;

    const db = DB.getInstance();

    try {
      const result = await db.client.$executeRaw(
        Prisma.sql`DELETE FROM errors WHERE created_at < NOW() - INTERVAL '${this.DELETE_THRESHOLD}'`
      );

      console.log(`Deleted ${result} old errors from the database`);
    } catch (e) {
      console.error(`Error deleting old errors: ${e}`);
    } finally {
      this.isRunning = false;
    }
  }
}

export class RollingDeleteTookTooLongError extends Error {
  constructor() {
    super("Rolling delete took too long to complete, aborting.");
  }
}
