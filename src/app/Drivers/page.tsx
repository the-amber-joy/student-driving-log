"use client";
import ListDrives from "@/app/Drivers/components/listDrives.component";
import DriverBtn from "@/app/Drivers/components/driverBtn.component";
import { Driver } from "@prisma/client";
import { map } from "lodash";
import { useState } from "react";

const Drivers = ({ drivers }: { drivers: Driver[] }) => {
  const [selectedDriverId, setSelectedDriverId] = useState<string>();

  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 10,
        }}
      >
        {map(drivers, (driver: Driver, i: number) => (
          <DriverBtn
            driver={driver}
            key={driver.id}
            idx={i}
            selectedDriverId={selectedDriverId}
            setSelectedDriverId={setSelectedDriverId}
          />
        ))}
      </div>
      {selectedDriverId && <ListDrives driverId={selectedDriverId} />}
    </>
  );
};

export default Drivers;
