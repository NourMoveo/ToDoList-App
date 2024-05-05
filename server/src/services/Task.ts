import { Model } from "mongoose";
import GenericService from "./GenericService";
import { TaskInterface } from "../models/task";

class TaskService extends GenericService<TaskInterface> {
  constructor(model: Model<TaskInterface>) {
    super(model);
  }
}

export default TaskService;
