import { registerWinController } from "../controllers/match.controller";
import { registerWin } from "../services/match.service";
import { Request, Response } from "express";

jest.mock("../services/match.service");

describe("registerWinController", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let statusMock: jest.Mock;
  let jsonMock: jest.Mock;

  beforeEach(() => {
    jsonMock = jest.fn();
    statusMock = jest.fn(() => ({ json: jsonMock })) as jest.Mock;
    mockResponse = {
      status: statusMock,
    };
  });

  it("should return 400 if user_id or win is missing", async () => {
    mockRequest = {
      body: { win: true },
    };

    await registerWinController(mockRequest as Request, mockResponse as Response);

    expect(statusMock).toHaveBeenCalledWith(400);
    expect(jsonMock).toHaveBeenCalledWith({ error: "user_id and win are required" });
  });

  it("should return 201 if win is registered successfully", async () => {
    (registerWin as jest.Mock).mockResolvedValueOnce(1);

    mockRequest = {
      body: { user_id: 1, win: true },
    };

    await registerWinController(mockRequest as Request, mockResponse as Response);

    expect(statusMock).toHaveBeenCalledWith(201);
    expect(jsonMock).toHaveBeenCalledWith({ message: "Win registered successfully" });
  });

  it("should return 400 if registering win fails", async () => {
    (registerWin as jest.Mock).mockResolvedValueOnce(0);

    mockRequest = {
      body: { user_id: 1, win: true },
    };

    await registerWinController(mockRequest as Request, mockResponse as Response);

    expect(statusMock).toHaveBeenCalledWith(400);
    expect(jsonMock).toHaveBeenCalledWith({ error: "Failed to register win" });
  });

  it("should return 500 if there is an internal server error", async () => {
    (registerWin as jest.Mock).mockRejectedValueOnce(new Error("Database error"));

    mockRequest = {
      body: { user_id: 1, win: true },
    };

    await registerWinController(mockRequest as Request, mockResponse as Response);

    expect(statusMock).toHaveBeenCalledWith(500);
    expect(jsonMock).toHaveBeenCalledWith({ error: "Internal server error" });
  });
});
