export const GameWinningSequenceLength = 5;

type MarkType = "X" | "Y" | null;

export const checkIfPlayerWon = (
  gameBoard: MarkType[][],
  rowIndex: number,
  cellIndex: number
) => {
  return (
    checkIfPlayerWonHorizontally(gameBoard, rowIndex, cellIndex) ||
    checkIfPlayerWonVertically(gameBoard, rowIndex, cellIndex)
  );
};

export const checkIfBoardIsFull = (gameBoard: MarkType[][]) => {
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

export const checkIfComputerWon = (
  gameBoard: MarkType[][],
  rowIndex: number,
  cellIndex: number
) => {
  return (
    checkIfComputerWonHorizontally(gameBoard, rowIndex, cellIndex) ||
    checkIfCompuerWonVertically(gameBoard, rowIndex, cellIndex)
  );
};

const checkIfComputerWonHorizontally = (
  gameBoard: MarkType[][],
  rowIndex: number,
  cellIndex: number
) => {
  let consecutiveMarks = 0;
  for (let i = 0; i < gameBoard[0].length; i++) {
    if (gameBoard[rowIndex][i] === "Y" || i === cellIndex) {
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

const checkIfCompuerWonVertically = (
  gameBoard: MarkType[][],
  rowIndex: number,
  cellIndex: number
) => {
  let consecutiveMarks = 0;
  for (let i = 0; i < gameBoard.length; i++) {
    if (gameBoard[i][cellIndex] === "Y" || i === rowIndex) {
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
