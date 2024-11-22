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

  const handleClick = (rowIndex: number, cellIndex: number) => {
    setGameBoard((prevBoard) => {
      const newBoard = prevBoard.map((row, i) =>
        row.map((cell, j) => {
          if (i === rowIndex && j === cellIndex) {
            return "X";
          }
          return cell;
        })
      );
      return newBoard;
    });
  };

  return (
    <div className="border-2 w-[900] h-[900]">
      {gameBoard.map((row, i) => (
        <div className="flex" key={i}>
          {row.map((cell, j) => (
            <GameBoardCell
              markType={cell}
              onClick={() => handleClick(i, j)}
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
