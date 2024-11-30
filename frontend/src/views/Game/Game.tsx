import React from "react";
import GameBoard from "./GameBoard";
import GameResultModal from "./GameResultModal";

function Game() {
  const [gameResultModalOpen, setGameResultModalOpen] =
    React.useState<boolean>(true);

  return (
    <div className="w-full justify-center items-center flex flex-col">
      <div className="py-10">
        <h1 className="font-bold text-5xl text-blue-500">GameView</h1>
      </div>
      <GameBoard />
      <GameResultModal
        open={gameResultModalOpen}
        handleClose={() => setGameResultModalOpen(false)}
      />
    </div>
  );
}

export default Game;
