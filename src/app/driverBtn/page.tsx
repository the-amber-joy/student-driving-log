"use client";
import { computeTotalHours } from "@/util";
import { Driver } from "@prisma/client";
import Image from "next/image";

const DriverBtn = ({ driver, idx }: { driver: Driver; idx: number }) => {
  const driverDetail = computeTotalHours(driver);
  return (
    <button
      key={driverDetail?.id}
      className="border border-white text-center mx-auto px-8 pb-4"
      onClick={() => console.log(driverDetail)}
    >
      <Image
        src={`https://robohash.org/${driverDetail.id}?set=set4&size=180x180`}
        width={180}
        height={180}
        alt={driverDetail.name ?? `Student Driver #${idx}`}
      />
      <p>{driver.name ?? `Student Driver #${idx}`}</p>
      <p>Day Hours Driven: {driverDetail.day_hours}</p>
      <p>Night Hours Driven: {driverDetail.night_hours}</p>
      <p>Total Hours Driven: {driverDetail.total_hours}</p>
    </button>
  );
};

export default DriverBtn;
