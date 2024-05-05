import mongoose, { Schema, Document } from "mongoose";

export interface TaskInterface extends Document {
  name: string;
  description: string;
  date: Date;
  lat: Float32Array;
  lng: Float32Array;
  done: Boolean;
  image: String;
}

const TaskSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  lat: { type: Float32Array, required: true },
  lng: { type: Float32Array, required: true },
  done: { type: Boolean, required: true },
  image: { type: String, required: true },
});

const TaskModel = mongoose.model<TaskInterface>("Task", TaskSchema);

export default TaskModel;
