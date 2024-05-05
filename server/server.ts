import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectToDB } from "./dataBase";
import userRoutes from "./src/routes/User";
import taskRoutes from "./src/routes/Task";

dotenv.config();

const app: express.Application = express();
const port: number = parseInt(process.env.PORT as string, 10) || 3000;

app.use(cors());
app.use(express.json());

// Register routes
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);

connectToDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to the database", error);
  });
