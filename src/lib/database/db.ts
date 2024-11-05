import { PrismaClient } from "@prisma/client";

export class DB {
  private static instance: DB;
  private prisma: PrismaClient = new PrismaClient();

  public static getInstance(): DB {
    if (!DB.instance) {
      DB.instance = new DB();
      DB.instance.init();
    }

    return DB.instance;
  }

  public async init() {
    await this.prisma.$connect();
  }

  public async teardown() {
    await this.prisma.$disconnect();
  }

  public get client() {
    return this.prisma;
  }
}
