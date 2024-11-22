import React from "react";

type MarkType = "X" | "Y" | null;

function GameBoard() {
  const GameBoardWidth = 9;
  const GameBoardHeight = 9;

  const [gameBoard, setGameBoard] = React.useState<MarkType[][]>(
    Array.from({ length: GameBoardHeight }, () =>
      Array.from({ length: GameBoardWidth }, () => null)
    )
  );

  const [gameBoardBlocked, setGameBoardBlocked] =
    React.useState<boolean>(false);

  const handlePlayerMove = (rowIndex: number, cellIndex: number) => {
    if (gameBoardBlocked) {
      return;
    }
    setGameBoardCell(rowIndex, cellIndex, "X");
    handleComputerMove();
  };

  const setGameBoardCell = (
    rowIndex: number,
    cellIndex: number,
    value: MarkType
  ) => {
    setGameBoard((prevBoard) => {
      const newBoard = prevBoard.map((row, i) =>
        row.map((cell, j) => {
          if (i === rowIndex && j === cellIndex) {
            return value;
          }
          return cell;
        })
      );
      return newBoard;
    });
  };

  const getRandomEmptyCellIndexes = () => {
    while (true) {
      const randomRow = getRandomInt(0, GameBoardHeight);
      const randomColumn = getRandomInt(0, GameBoardWidth);
      if (gameBoard[randomRow][randomColumn] === null) {
        return { randomRow, randomColumn };
      }
    }
  };

  function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  const handleComputerMove = () => {
    setGameBoardBlocked(true);
    const computerMove = getRandomEmptyCellIndexes();
    setGameBoardCell(computerMove.randomRow, computerMove.randomColumn, "Y");
    setGameBoardBlocked(false);
  };

  return (
    <div className="border-2 w-[900] h-[900]">
      {gameBoard.map((row, i) => (
        <div className="flex" key={i}>
          {row.map((cell, j) => (
            <GameBoardCell
              markType={cell}
              onClick={() => handlePlayerMove(i, j)}
              key={j}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

const GameBoardCell = ({
  markType,
  onClick,
}: {
  markType: MarkType;
  onClick: () => void;
}) => {
  return (
    <div
      className="border-2 w-[70px] h-[70px] flex justify-center items-center"
      onClick={onClick}
    >
      {markType?.toString()}
    </div>
  );
};

export default GameBoard;
