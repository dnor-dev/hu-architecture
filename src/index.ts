import express from "express";
import { routes } from "./routes";
import { AppDataSource } from "./config/db";

const app = express();

app.use(express.json());

app.use("api/v1", routes);

AppDataSource.initialize().then(() => {
  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
});
