"use client";
import Image from "next/image";
import { computeTotalHours } from "@/lib/helpers";
import { Driver } from "@prisma/client";
import { Box, Button, Modal, Typography } from "@mui/material";
import { useState } from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ListDrives from "@/app/all-drives/allDrives";
import DriveHistory from "../all-drives/page";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const startDrive = (driverId: string) =>
  fetch(`http://localhost:3000/api/drives`, {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=utf8",
    },
    body: JSON.stringify({
      driver: { connect: { id: driverId } },
    }),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
    });

const DriverBtn = ({ driver, idx }: { driver: Driver; idx: number }) => {
  const { id, name, day_hours, night_hours, total_hours } =
    computeTotalHours(driver);
  const [open, setOpen] = useState(false);
  const handleOpen = (id: string) => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const handleStart = () => {
    startDrive(id).then(
      (newDrive) => {
        console.log(newDrive);
        if (newDrive) handleClose();
      },
      (err) => {
        console.log("pop a toast or something here", err);
      }
    );
  };

  return (
    <>
      <button
        key={id}
        className="border border-white text-center p-2 w-full mx-auto"
        onClick={() => handleOpen(id)}
      >
        <Image
          src={`https://robohash.org/${id}?set=set4&size=180x180`}
          width={180}
          height={180}
          alt={name ?? `Student Driver #${idx}`}
          priority
        />
        <p>{driver.name ?? `Student Driver #${idx}`}</p>
        <p>Day Hours Driven: {day_hours}</p>
        <p>Night Hours Driven: {night_hours}</p>
        <p>Total Hours Driven: {total_hours}</p>
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <span className="text-black">{name}</span>
          </Typography>
          <Button
            variant="contained"
            size="large"
            endIcon={<ArrowForwardIcon />}
            onClick={handleStart}
          >
            Start Drive
          </Button>

          <DriveHistory driverId={id} />
        </Box>
      </Modal>
    </>
  );
};

export default DriverBtn;
