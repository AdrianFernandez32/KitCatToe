import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";

function GameResultModal({
  open,
  handleClose,
  winner,
}: {
  open: boolean;
  handleClose: () => void;
  winner: "player" | "computer" | null;
}) {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box className="w-1/4 bg-white flex flex-col text-center items-center justify-center rounded-lg p-4 shadow-lg absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
        <p className="text-3xl font-bold">The {winner} is the winner!</p>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Congratulations! The {winner} won the game
        </Typography>
        <p>Do you want to play again?</p>
        <Button variant="contained" className="mt-4" onClick={handleClose}>
          Play again
        </Button>
      </Box>
    </Modal>
  );
}

export default GameResultModal;
