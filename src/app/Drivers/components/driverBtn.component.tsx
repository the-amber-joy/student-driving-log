"use client";
import Image from "next/image";
import { computeTotalHours } from "@/lib/helpers";
import { Driver } from "@prisma/client";
import { Box, Button, Modal, Typography } from "@mui/material";
import { useState } from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CancelIcon from "@mui/icons-material/Cancel";
import ListDrives from "@/app/Drivers/components/listDrives.component";
import clsx from "clsx";
import StartDriveModal from "./startDrive.component";

const DriverBtn = ({
  driver,
  idx,
  selectedDriverId,
  setSelectedDriverId,
}: {
  driver: Driver;
  idx: number;
  selectedDriverId?: string;
  setSelectedDriverId: (driverId: string) => void;
}) => {
  const { id, name, day_hours, night_hours, total_hours } = driver;
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <StartDriveModal
        name={name}
        id={id}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
      />
      <button
        key={id}
        className={clsx("border border-black text-center p-2 w-full", {
          "bg-green": id == selectedDriverId,
        })}
        onClick={() => {
          setSelectedDriverId(id);
          setModalOpen(true);
        }}
      >
        <Image
          src={`https://robohash.org/${id}?set=set4&size=180x180`}
          width={180}
          height={180}
          alt={name ?? `Student Driver #${idx}`}
          priority
          className="mx-auto"
        />
        <p>{driver.name ?? `Student Driver #${idx}`}</p>
        <p>Day Hours Driven: {day_hours}</p>
        <p>Night Hours Driven: {night_hours}</p>
        <p>Total Hours Driven: {total_hours}</p>
      </button>
    </>
  );
};

export default DriverBtn;
