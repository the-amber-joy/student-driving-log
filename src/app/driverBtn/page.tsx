"use client";
import { computeTotalHours } from "@/types";
import { Driver } from "@prisma/client";
import Image from "next/image";

const DriverBtn = ({ d, idx }: { d: Driver; idx: number }) => {
  const driver = computeTotalHours(d);
  return (
    <button
      key={driver?.id}
      className="border border-white text-center mx-auto px-8 pb-4"
      onClick={() => console.log(driver)}
    >
      <Image
        src={`https://robohash.org/${driver?.id}?set=set4&size=180x180`}
        width={180}
        height={180}
        alt={driver?.name ?? `Student Driver #${idx}`}
      />
      <p>{driver.name ?? `Student Driver #${idx}`}</p>
      <p>Day Hours Driven: {driver?.day_hours}</p>
      <p>Night Hours Driven: {driver?.night_hours}</p>
      <p>Total Hours Driven: {driver?.total_hours}</p>
    </button>
  );
};

export default DriverBtn;
