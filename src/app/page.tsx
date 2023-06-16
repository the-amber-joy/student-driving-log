import { map } from "lodash";
import { prisma } from "@/lib/prisma";
import DriverBtn from "./driverBtn/page";
import { Driver } from "@prisma/client";
import ListDrives from "@/components/allDrives.component";
// import ListDrives from "@/app/all-drives/allDrives";
import Link from "next/link";

export default async function Home() {
  // const records = await prisma.driverSupervisor.findMany({
  //   where: { supervisorId: "clixhpst200020vfwhwfmgdh7" },
  // });
  const drivers = await prisma.driver.findMany();

  return (
    <main
      style={{ maxWidth: 1200, marginInline: "auto", padding: 20 }}
      className="h-screen"
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr",
          gap: 20,
        }}
      >
        {map(drivers, (driver: Driver, i: number) => (
          <DriverBtn
            driver={JSON.parse(JSON.stringify(driver))}
            key={driver.id}
            idx={i}
          />
        ))}
        {/* TODO: Amber, 2023-06-15 - Maybe like, show this list when a driver is clicked */}
        {/* <ListDrives /> */}
      </div>
      {/* <div>
        <p>
          <Link href="/initial-data">Prefetching Using initial data</Link>
        </p>
        <p>
          <Link href="/hydration">Prefetching Using Hydration</Link>
        </p>
      </div> */}
    </main>
  );
}
