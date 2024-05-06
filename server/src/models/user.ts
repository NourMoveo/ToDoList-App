import mongoose, { Schema, Document } from "mongoose";
import { TaskInterface } from "./task";

export interface UserI extends Document {
  fName: string;
  lName: string;
  phone: string;
  email: string;
  password: string;
  tasks: TaskInterface[];
}

const UserSchema: Schema = new Schema({
  fName: { type: String, required: true, maxlength: 35 },
  lName: { type: String, required: true, maxlength: 35 },
  phone: {
    type: String,
    required: true,
    validate: {
      validator: function (value: string) {
        const phoneRegex = /^(?:\+?972|0)(?:\d{1}|\d{2})-?\d{3}-?\d{4}$/;
        return phoneRegex.test(value);
      },
      message: "Invalid Israeli phone number format",
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: {
      validator: function (value: string) {
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
      },
      message: "Invalid email format",
    },
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: function (value: string) {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{9,}$/;
        return passwordRegex.test(value);
      },
      message: "Password must contain at least one lowercase letter, one uppercase letter, one digit, and be at least 9 characters long",
    },
  },
  tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
});

UserSchema.pre<UserI>("find", function (next) {
  this.populate("tasks");
  next();
});

const UserModel = mongoose.model<UserI>("User", UserSchema);

export default UserModel;
