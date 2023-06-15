import {map} from "lodash";
import { prisma } from "@/lib/prisma";
import DriverBtn from "./driverBtn/page";
import { Driver } from "@prisma/client";

export default async function Home() {
  // const records = await prisma.driverSupervisor.findMany({
  //   where: { supervisorId: "clixhpst200020vfwhwfmgdh7" },
  // });
  const drivers = await prisma.driver.findMany();

  return (
    <main style={{ maxWidth: 1200, marginInline: "auto", padding: 20 }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr",
          gap: 20,
        }}
      >
        {map(drivers, (driver: Driver, i: number) => (
          <DriverBtn
            d={JSON.parse(JSON.stringify(driver))}
            key={driver.id}
            idx={i}
          />
        ))}
      </div>
    </main>
  );
}
