import * as express from "express";
import * as dotenv from "dotenv";
import * as cors from "cors";

import articlesRouter from "./router/articles";
import userRouter from "./router/users";
import { main } from "./migrate";

dotenv.config();
main();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/articles", articlesRouter);
app.use("/api/users", userRouter);

app.get("/", async (req, res) => {
  res.json({ message: "Hello World" });
});

app.listen(8080, () => {
  console.log("Server is running on port 3000");
});
