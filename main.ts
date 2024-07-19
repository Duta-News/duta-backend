import express from "express";
import dotenv from "dotenv";
import articlesRouter from "./router/articles";

dotenv.config();

const app = express();

app.use(express.json());
app.use("/api/articles", articlesRouter);

app.get("/", async (req, res) => {
  res.json({ message: "Hello World" });
});

app.listen(8080, () => {
  console.log("Server is running on port 3000");
});
