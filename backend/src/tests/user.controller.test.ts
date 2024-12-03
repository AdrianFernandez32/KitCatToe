import { registerUser, updateProfile } from "../controllers/user.controller";
import { createUser, getUserByEmail, updateUserProfile } from "../services/user.service";
import { Request, Response } from "express";

jest.mock("../services/user.service");

describe("User Controller Tests", () => {
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

  describe("registerUser", () => {
    it("should return 400 if fields are missing", async () => {
      mockRequest = {
        body: { email: "test@example.com", password: "123456" },
      };

      await registerUser(mockRequest as Request, mockResponse as Response);

      expect(statusMock).toHaveBeenCalledWith(400);
      expect(jsonMock).toHaveBeenCalledWith({ error: "All fields are required" });
    });

    it("should return 409 if email already exists", async () => {
      (getUserByEmail as jest.Mock).mockResolvedValueOnce({ id: 1 });

      mockRequest = {
        body: { nickname: "testuser", email: "test@example.com", password: "123456" },
      };

      await registerUser(mockRequest as Request, mockResponse as Response);

      expect(statusMock).toHaveBeenCalledWith(409);
      expect(jsonMock).toHaveBeenCalledWith({ error: "Email already exists" });
    });

    it("should return 201 on successful registration", async () => {
      (getUserByEmail as jest.Mock).mockResolvedValueOnce(null);
      (createUser as jest.Mock).mockResolvedValueOnce({ id: 1, nickname: "testuser" });

      mockRequest = {
        body: { nickname: "testuser", email: "test@example.com", password: "123456" },
      };

      await registerUser(mockRequest as Request, mockResponse as Response);

      expect(statusMock).toHaveBeenCalledWith(201);
      expect(jsonMock).toHaveBeenCalledWith({
        message: "User registered successfully",
        user: { id: 1, nickname: "testuser" },
      });
    });

    it("should return 500 on internal server error", async () => {
      (getUserByEmail as jest.Mock).mockRejectedValueOnce(new Error("Database error"));

      mockRequest = {
        body: { nickname: "testuser", email: "test@example.com", password: "123456" },
      };

      await registerUser(mockRequest as Request, mockResponse as Response);

      expect(statusMock).toHaveBeenCalledWith(500);
      expect(jsonMock).toHaveBeenCalledWith({ error: "Internal server error" });
    });
  });

  describe("updateProfile", () => {
    it("should return 400 if user ID is invalid", async () => {
      mockRequest = {
        params: { id: "abc" },
        body: { nickname: "updatedUser" },
      };

      await updateProfile(mockRequest as Request, mockResponse as Response);

      expect(statusMock).toHaveBeenCalledWith(400);
      expect(jsonMock).toHaveBeenCalledWith({ error: "Invalid user ID" });
    });

    it("should return 400 if no fields are provided to update", async () => {
      mockRequest = {
        params: { id: "1" },
        body: {},
      };

      await updateProfile(mockRequest as Request, mockResponse as Response);

      expect(statusMock).toHaveBeenCalledWith(400);
      expect(jsonMock).toHaveBeenCalledWith({
        error: "At least one field to update is required",
      });
    });

    it("should return 404 if user is not found", async () => {
      (updateUserProfile as jest.Mock).mockResolvedValueOnce(0);

      mockRequest = {
        params: { id: "1" },
        body: { nickname: "updatedUser" },
      };

      await updateProfile(mockRequest as Request, mockResponse as Response);

      expect(statusMock).toHaveBeenCalledWith(404);
      expect(jsonMock).toHaveBeenCalledWith({ error: "User not found" });
    });

    it("should return 200 on successful profile update", async () => {
      (updateUserProfile as jest.Mock).mockResolvedValueOnce(1);

      mockRequest = {
        params: { id: "1" },
        body: { nickname: "updatedUser" },
      };

      await updateProfile(mockRequest as Request, mockResponse as Response);

      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith({
        message: "Profile updated successfully",
      });
    });

    it("should return 500 on internal server error", async () => {
      (updateUserProfile as jest.Mock).mockRejectedValueOnce(new Error("Database error"));

      mockRequest = {
        params: { id: "1" },
        body: { nickname: "updatedUser" },
      };

      await updateProfile(mockRequest as Request, mockResponse as Response);

      expect(statusMock).toHaveBeenCalledWith(500);
      expect(jsonMock).toHaveBeenCalledWith({ error: "Internal server error" });
    });
  });
});
