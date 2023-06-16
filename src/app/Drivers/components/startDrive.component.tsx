"use client";
import { Alert, Box, Button, Modal, Snackbar, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CancelIcon from "@mui/icons-material/Cancel";
import { useState } from "react";
import UseDayNightSwitch from "./dayNightSwitch.component";

const startDrive = (driverId: string, isNight: boolean) =>
  fetch(`http://localhost:3000/api/drives`, {
    method: "POST",
    headers: {
      "content-type": "application/json; charset=utf8",
    },
    body: JSON.stringify({
      driver: { connect: { id: driverId } },
      isNight
    }),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
    });

const boxStyle = {
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

const StartDriveModal = ({
  id,
  name,
  modalOpen,
  setModalOpen,
}: {
  id: string;
  name: string;
  modalOpen: boolean;
  setModalOpen: (setModalOpen: boolean) => void;
}) => {
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);
  const handleSnackbarClose = () => {
    setShowSuccess(false);
    setShowError(false);
  };
  const handleModalClose = () => setModalOpen(false);

  const severity = showSuccess ? "success" : "error";
  const color = showSuccess ? "info" : "error";

  const handleStart = (id: string, isNight: boolean) => {
    startDrive(id, isNight).then(
      (newDrive) => {
        if (newDrive) {
          handleModalClose();
          setShowSuccess(true);
        }
      },
      (err) => {
        console.log(err);
        handleModalClose();
        setShowError(true);
      }
    );
  };

  const [isNight, setIsNight] = useState<boolean>(false)
  const handleSwitch = (v: any) => {
    setIsNight(v.target.checked);
  }
  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={showSuccess || showError}
        onClose={handleSnackbarClose}
        autoHideDuration={3000}
      >
        <Alert severity={severity} color={color}>
          {showSuccess && `${name} is Driving`}
          {showError && "Something went wrong - please try again"}
        </Alert>
      </Snackbar>
      <Modal open={modalOpen} onClose={handleModalClose}>
        <Box sx={boxStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <span className="text-black"> Start New Drive for {name}?</span>
          </Typography>
          <div className="flex justify-around">
            <Button
              variant="outlined"
              size="small"
              endIcon={<CancelIcon />}
              onClick={() => setModalOpen(false)}
              color="error"
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              size="small"
              endIcon={<ArrowForwardIcon />}
              onClick={() => handleStart(id, isNight)}
              color="success"
            >
              Start Driving
            </Button>
            <UseDayNightSwitch onChange={handleSwitch} />
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default StartDriveModal;
