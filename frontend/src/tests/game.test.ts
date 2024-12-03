import {
  checkIfPlayerWon,
  GameWinningSequenceLength,
} from "../views/Game/gameUtils";

type MarkType = "X" | "Y" | null;

describe("checkIfPlayerWon", () => {
  it("should return true if player has a vertical winning sequence", () => {
    const gameBoard: MarkType[][] = [
      [null, "X", null],
      [null, "X", null],
      [null, "X", null],
      [null, "X", null],
      [null, null, null],
    ];
    const rowIndex = 4;
    const cellIndex = 1;
    expect(checkIfPlayerWon(gameBoard, rowIndex, cellIndex)).toBe(true);
  });
});
