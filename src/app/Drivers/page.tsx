"use client";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ListDrives from "@/components/listDrives.component";
import DriverBtn from "@/components/driverBtn.component";
import { Driver } from "@prisma/client";
import { map } from "lodash";
import { useState } from "react";
import { Alert, Button, Snackbar } from "@mui/material";

const startDrive = (driverId: string) =>
  fetch(`http://localhost:3000/api/drives`, {
    method: "POST",
    headers: {
      "content-type": "application/json; charset=utf8",
    },
    body: JSON.stringify({
      driver: { connect: { id: driverId } },
    }),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
    });

const Drivers = ({ drivers }: { drivers: Driver[] }) => {
  const [selectedDriverId, setSelectedDriverId] = useState<string>();
  const handleStart = (id: string) => {
    startDrive(id).then(
      (newDrive) => {
        console.log(newDrive);
        if (newDrive) setShowSuccess(true);
      },
      (err) => {
        setShowError(true);
        console.log(err);
      }
    );
  };

  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);
  const handleClose = () => {
    setShowSuccess(false);
  };
  const severity = showSuccess ? "success" : "error"
  const color = showSuccess ? "info" : "error"
  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={showSuccess || showError}
        onClose={handleClose}
        autoHideDuration={3000}
      >
        <Alert severity={severity} color={color}>
          {showSuccess && "Drive started!"}
          {showError && "Something went wrong - please try again"}
        </Alert>
      </Snackbar>
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
        {selectedDriverId && (
          <Button
            variant="contained"
            size="large"
            endIcon={<ArrowForwardIcon />}
            onClick={() => handleStart(selectedDriverId)}
            color="success"
          >
            Start New Drive?
          </Button>
        )}
      </div>
      {selectedDriverId && <ListDrives driverId={selectedDriverId} />}
    </>
  );
};

export default Drivers;
