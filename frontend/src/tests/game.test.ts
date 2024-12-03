import { checkIfPlayerWon, checkIfComputerWon } from "../views/Game/gameUtils";

type MarkType = "X" | "Y" | null;

describe("checkIfPlayerWon", () => {
  it("should return true if player has a vertical winning sequence", () => {
    const gameBoard: MarkType[][] = [
      [null, "X", null, null, null],
      [null, "X", null, null, null],
      [null, "X", null, null, null],
      [null, "X", null, null, null],
      [null, null, null, null, null],
    ];
    const rowIndex = 4;
    const cellIndex = 1;
    expect(checkIfPlayerWon(gameBoard, rowIndex, cellIndex)).toBe(true);
  });

  it("should return true if computer has a vertical winning sequence", () => {
    const gameBoard: MarkType[][] = [
      [null, "Y", null, null, null],
      [null, "Y", null, null, null],
      [null, "Y", null, null, null],
      [null, "Y", null, null, null],
      [null, null, null, null, null],
    ];
    const rowIndex = 4;
    const cellIndex = 1;
    expect(checkIfComputerWon(gameBoard, rowIndex, cellIndex)).toBe(true);
  });

  it("should return false if computer doesn't have a vertical winning sequence", () => {
    const gameBoard: MarkType[][] = [
      [null, "Y", null, null, null],
      [null, "Y", null, null, null],
      [null, "Y", null, null, null],
      [null, "X", null, null, null],
      [null, null, null, null, null],
    ];
    const rowIndex = 4;
    const cellIndex = 1;
    expect(checkIfComputerWon(gameBoard, rowIndex, cellIndex)).toBe(false);
  });
});

it("should return true if player has a horizontal winning sequence", () => {
  const gameBoard: MarkType[][] = [
    [null, null, null, null, null],
    ["X", "X", "X", "X", null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
  ];
  const rowIndex = 1;
  const cellIndex = 4;
  expect(checkIfPlayerWon(gameBoard, rowIndex, cellIndex)).toBe(true);
});

it("should return true if computer has a horizontal winning sequence", () => {
  const gameBoard: MarkType[][] = [
    [null, null, null, null, null],
    ["Y", "Y", "Y", "Y", null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
  ];
  const rowIndex = 1;
  const cellIndex = 4;
  expect(checkIfComputerWon(gameBoard, rowIndex, cellIndex)).toBe(true);
});
