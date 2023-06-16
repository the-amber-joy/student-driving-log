"use client";
import Image from "next/image";
import { computeTotalHours } from "@/lib/helpers";
import { Driver } from "@prisma/client";
import { Box, Button, Modal, Typography } from "@mui/material";
import { useState } from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ListDrives from "@/components/allDrives.component";

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

const DriverBtn = ({ driver, idx }: { driver: Driver; idx: number }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = (id: string) => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const startDrive = () => console.log("foo");
  const { id, name, day_hours, night_hours, total_hours } =
    computeTotalHours(driver);

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
            onClick={startDrive}
          >
            Start Drive
          </Button>

          {/* <ListDrives driverId={id} /> */}
        </Box>
      </Modal>
    </>
  );
};

export default DriverBtn;
