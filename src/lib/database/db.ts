import { PrismaClient } from "@prisma/client/extension";

export class DB {
  private static instance: DB;
  private prisma: PrismaClient = new PrismaClient();

  public static getInstance(): DB {
    if (!DB.instance) {
      DB.instance = new DB();
    }
    return DB.instance;
  }

  public async init() {
    await this.prisma.$connect();
  }

  public async teardown() {
    await this.prisma.$disconnect();
  }
}
