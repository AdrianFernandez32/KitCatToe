import React from "react";
import GameBoard from "./GameBoard";
import GameResultModal from "./GameResultModal";
import { useAuth } from "../../context/AuthContext";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

type MarkType = "X" | "Y" | null;
const GameBoardWidth = 9;
const GameBoardHeight = 9;

function Game() {
  const { token } = useAuth();
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
    uploadGameResult(winner);
    setWinner(winner);
    setGameResultModalOpen(true);
  };

  interface DecodedToken {
    id: string;
    email: string;
    nickname: string;
    // Add any other properties you expect in the token
  }

  const uploadGameResult = async (winner: "player" | "computer") => {
    try {
      if (!token) {
        return;
      }
      const decodedToken = jwtDecode<DecodedToken>(token);
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/partidas/register`,
        {
          user_id: decodedToken.id,
          win: winner === "player",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status < 200 || response.status >= 300) {
        throw new Error("Failed to upload game result");
      }
    } catch (error) {
      console.error(error);
    }
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
