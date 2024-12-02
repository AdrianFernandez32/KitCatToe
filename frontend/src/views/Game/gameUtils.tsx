const GameWinningSequenceLength = 5;

type MarkType = "X" | "Y" | null;

export const checkIfPlayerWon = (
  gameBoard: MarkType[][],
  rowIndex: number,
  cellIndex: number
) => {
  console.log(gameBoard);
  console.log(checkIfPlayerWonHorizontally(gameBoard, rowIndex, cellIndex));
  console.log(checkIfPlayerWonVertically(gameBoard, rowIndex, cellIndex));
  return (
    checkIfPlayerWonHorizontally(gameBoard, rowIndex, cellIndex) ||
    checkIfPlayerWonVertically(gameBoard, rowIndex, cellIndex)
  );
};

const checkIfBoardIsFull = (gameBoard: MarkType[][]) => {
  return gameBoard.every((row) => row.every((cell) => cell !== null));
};

const checkIfPlayerWonHorizontally = (
  gameBoard: MarkType[][],
  rowIndex: number,
  cellIndex: number
) => {
  let consecutiveMarks = 0;
  for (let i = 0; i < gameBoard[0].length; i++) {
    if (gameBoard[rowIndex][i] === "X" || i === cellIndex) {
      consecutiveMarks++;
      if (consecutiveMarks === GameWinningSequenceLength) {
        return true;
      }
    } else {
      consecutiveMarks = 0;
    }
  }
  return false;
};

const checkIfPlayerWonVertically = (
  gameBoard: MarkType[][],
  rowIndex: number,
  cellIndex: number
) => {
  let consecutiveMarks = 0;
  for (let i = 0; i < gameBoard.length; i++) {
    if (gameBoard[i][cellIndex] === "X" || i === rowIndex) {
      consecutiveMarks++;
      if (consecutiveMarks === GameWinningSequenceLength) {
        return true;
      }
    } else {
      consecutiveMarks = 0;
    }
  }
  return false;
};

// const checkIfPlayerWonDiagonallyFromCell = (
//   gameBoard: MarkType[][],
//   rowIndex: number,
//   cellIndex: number,
//   rowIncrement: number,
//   cellIncrement: number
// ) => {
//   let consecutiveMarks = 0;
//   let i = rowIndex;
//   let j = cellIndex;

//   while (i >= 0 && i < gameBoard.length && j >= 0 && j < gameBoard[i].length) {
//     if (gameBoard[i][j] === "X") {
//       consecutiveMarks++;
//       if (consecutiveMarks === GameWinningSequenceLength) {
//         return true;
//       }
//     } else {
//       consecutiveMarks = 0;
//     }
//     i += rowIncrement;
//     j += cellIncrement;
//   }
//   return false;
// };
