import { Model } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User, { UserI } from "../models/user";
import GenericService from "./GenericService";
import Task, { TaskInterface } from "../models/task";

class UserService extends GenericService<UserI> {
  constructor(model: Model<UserI>) {
    super(model);
  }
  async signUp(userData: UserI): Promise<void> {
    try {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(userData.password, saltRounds);
      const newUser = new this.model({
        ...userData,
        password: hashedPassword,
      });
      await newUser.save();
    } catch (error) {
      console.error("Error creating user:", error);
      throw new Error("Error creating user");
    }
  }

  async userLogin(email: string, password: string): Promise<string> {
    try {
      const user = await this.model.findOne({ email });
      if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new Error("Invalid credentials");
      }
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || "your_jwt_secret", {
        expiresIn: "3h",
      });
      return token;
    } catch (error) {
      throw new Error("Error logging in");
    }
  }

  async getTasks(query: string): Promise<TaskInterface[]> {
    try {
      let tasks: TaskInterface[];

      if (query.toLowerCase() === "all") {
        tasks = await Task.find();
      } else {
        tasks = await Task.find({ category: query });
      }
      return tasks;
    } catch (error) {
      console.error("Error fetching tasks:", error);
      throw new Error("Error fetching tasks");
    }
  }
}

export default UserService;
