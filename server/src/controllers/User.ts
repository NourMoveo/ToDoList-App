import { Request, Response } from "express";
import { Model } from "mongoose";
import { UserI } from "../models/user";
import UserService from "../services/User";
import GenericController from "./GenericController";

class UserController extends GenericController<UserI> {
  private userService: UserService;

  constructor(model: Model<UserI>) {
    super(model);
    this.userService = new UserService(model);
  }

  signUp = async (req: Request, res: Response): Promise<void> => {
    try {
      const userData = req.body;
      await this.userService.signUp(userData as UserI);
      res.status(201).json({ message: "User created successfully" });
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  userLogin = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;
      const token = await this.userService.userLogin(email, password);
      res.status(200).json({ token });
    } catch (error) {
      res.status(401).json({ error: (error as Error).message });
    }
  };
}

export default UserController;
