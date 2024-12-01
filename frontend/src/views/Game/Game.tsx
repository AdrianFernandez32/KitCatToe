import React from "react";
import GameBoard from "./GameBoard";
import GameResultModal from "./GameResultModal";

type MarkType = "X" | "Y" | null;
const GameBoardWidth = 9;
const GameBoardHeight = 9;

function Game() {
  const [gameResultModalOpen, setGameResultModalOpen] =
    React.useState<boolean>(false);
  const [winner, setWinner] = React.useState<"player" | "computer" | null>(
    null
  );
  const [gameBoard, setGameBoard] = React.useState<MarkType[][]>(
    Array.from({ length: GameBoardHeight }, () =>
      Array.from({ length: GameBoardWidth }, () => null)
    )
  );

  const handleGameEnd = (winner: "player" | "computer") => {
    setWinner(winner);
    setGameResultModalOpen(true);
  };

  const handlePlayAgain = () => {
    resetGameBoard();
    setGameResultModalOpen(false);
    setWinner(null);
  };

  const resetGameBoard = () => {
    setGameBoard(
      Array.from({ length: GameBoardHeight }, () =>
        Array.from({ length: GameBoardWidth }, () => null)
      )
    );
  };

  return (
    <div className="w-full justify-center items-center flex flex-col">
      <div className="py-10">
        <h1 className="font-bold text-5xl text-blue-500">GameView</h1>
      </div>
      <GameBoard
        handleGameEnd={handleGameEnd}
        gameBoard={gameBoard}
        setGameBoard={setGameBoard}
      />
      <GameResultModal
        open={gameResultModalOpen}
        handleClose={() => handlePlayAgain()}
        winner={winner}
      />
    </div>
  );
}

export default Game;
