import { Request, Response } from "express";
import { Model } from "mongoose";
import { TaskInterface } from "../models/task";
import TaskService from "../services/Task";
import GenericController from "./GenericController";

class TaskController extends GenericController<TaskInterface> {
  private TaskService: TaskService;

  constructor(model: Model<TaskInterface>) {
    super(model);
    this.TaskService = new TaskService(model);
  }
}

export default TaskController;
