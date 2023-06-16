import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";

let globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    // log: ["query"],
  }).$extends({
    result: {
      drive: {
        drive_length: {
          needs: { start_timestamp: true, end_timestamp: true },
          compute(drive) {
            const total = drive?.end_timestamp
              ? dayjs(drive.start_timestamp).diff(
                  dayjs(drive.end_timestamp),
                  "hours"
                )
              : 0;
            return total;
          },
        },
      },
      driver: {
        total_hours: {
          needs: { day_hours: true, night_hours: true },
          compute(driver) {
            return driver.day_hours + driver.night_hours;
          },
        },
      },
    },
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
