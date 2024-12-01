const GameWinningSequenceLength = 4;

type MarkType = "X" | "Y" | null;

export const checkIfPlayerWon = (gameBoard: MarkType[][]) => {
  return (
    checkIfPlayerWonHorizontally(gameBoard) ||
    checkIfPlayerWonVertically(gameBoard) ||
    checkIfPlayerWonDiagonally(gameBoard)
  );
};

const checkIfBoardIsFull = (gameBoard: MarkType[][]) => {
  return gameBoard.every((row) => row.every((cell) => cell !== null));
};

const checkIfPlayerWonHorizontally = (gameBoard: MarkType[][]) => {
  for (let i = 0; i < gameBoard.length; i++) {
    let consecutiveMarks = 0;
    for (let j = 0; j < gameBoard.length; j++) {
      if (gameBoard[i][j] === "X") {
        consecutiveMarks++;
        if (consecutiveMarks === GameWinningSequenceLength) {
          return true;
        }
      } else {
        consecutiveMarks = 0;
      }
    }
  }
  return false;
};

const checkIfPlayerWonVertically = (gameBoard: MarkType[][]) => {
  for (let i = 0; i < gameBoard.length; i++) {
    let consecutiveMarks = 0;
    for (let j = 0; j < gameBoard[0].length; j++) {
      if (gameBoard[j][i] === "X") {
        consecutiveMarks++;
        if (consecutiveMarks === GameWinningSequenceLength) {
          return true;
        }
      } else {
        consecutiveMarks = 0;
      }
    }
  }
  return false;
};

const checkIfPlayerWonDiagonally = (gameBoard: MarkType[][]) => {
  for (let i = 0; i < gameBoard.length; i++) {
    for (let j = 0; j < gameBoard[0].length; j++) {
      if (checkIfPlayerWonDiagonallyFromCell(gameBoard, i, j)) {
        return true;
      }
    }
  }
  return false;
};

const checkIfPlayerWonDiagonallyFromCell = (
  gameBoard: MarkType[][],
  i: number,
  j: number
) => {
  let consecutiveMarks = 0;
  for (
    let k = 0;
    k < GameWinningSequenceLength &&
    i + k < gameBoard.length &&
    j + k < gameBoard[0].length;
    k++
  ) {
    if (gameBoard[i + k][j + k] === "X") {
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
