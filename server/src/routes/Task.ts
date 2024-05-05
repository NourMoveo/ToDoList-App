import { ErrorRequestHandler, Request, Response, NextFunction, Router } from "express";

import TaskModel from "../models/task";
import TaskController from "../controllers/Task";
const TaskRouter = Router();
const taskController = new TaskController(TaskModel);

TaskRouter.post("/", (req: Request, res: Response) => {
  taskController.create(req, res);
});

TaskRouter.get("/", (req: Request, res: Response) => {
  taskController.getAll(req, res);
});

TaskRouter.put("/:id", (req: Request, res: Response) => {
  taskController.update(req, res);
});

TaskRouter.delete("/:id", (req: Request, res: Response) => {
  taskController.delete(req, res);
});
export default TaskRouter;
