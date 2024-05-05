import { Router } from "express";
import UserController from "../controllers/User";
import UserModel from "../models/user";
import { authenticateToken } from "../middleware/userAuthentication";

const userRouter = Router();
const userController = new UserController(UserModel);

userRouter.get("/", (req, res) => {
  userController.getAll(req, res);
});
userRouter.post("/signup", userController.signUp);
userRouter.post("/login", userController.userLogin);
userRouter.get("/:id", userController.getById);
userRouter.put("/:id", userController.update);
userRouter.delete("/:id", userController.delete);

export default userRouter;
