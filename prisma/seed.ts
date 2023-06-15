import { PrismaClient } from "@prisma/client";
import { joey, janey, mom, dad } from "./seed-data";

const prisma = new PrismaClient();

async function load() {
  const driverJoey = await prisma.driver.upsert({
    where: { email: joey.email },
    update: {},
    create: joey,
  });
  console.log({ driverJoey });

  const driverJaney = await prisma.driver.upsert({
    where: { email: janey.email },
    update: {},
    create: janey,
  });
  console.log({ driverJaney });

  const superMom = await prisma.supervisor.upsert({
    where: { email: mom.email },
    update: {},
    create: mom,
  });
  console.log({ superMom });

  const superDad = await prisma.supervisor.upsert({
    where: { email: dad.email },
    update: {},
    create: dad,
  });
  console.log({ superDad });

  const driverSupervisors = await prisma.driverSupervisor.createMany({
    data: [
      { driverId: driverJoey.id, supervisorId: superDad.id },
      { driverId: driverJaney.id, supervisorId: superDad.id },
      { driverId: driverJaney.id, supervisorId: superMom.id },
    ],
  });
  console.log({ driverSupervisors });
}

load()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit();
  });
