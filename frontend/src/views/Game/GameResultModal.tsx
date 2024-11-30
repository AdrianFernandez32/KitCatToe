import React from "react";
import { Modal, Box, Typography } from "@mui/material";

function GameResultModal({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}) {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box className="w-1/4 bg-white rounded-lg p-4 shadow-lg absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
        <p className="text-3xl font-bold">Text in a modal</p>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
        </Typography>
      </Box>
    </Modal>
  );
}

export default GameResultModal;
