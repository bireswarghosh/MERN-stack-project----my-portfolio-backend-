import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
export const app = express();
// this 3 line is madantory
app.use(express.json({ limit: "50mb" })); // send err massage or return any thing from db i use json data so  use this line 
app.use(express.urlencoded({ extended: true, limit: "50mb" })); // accept data from req.body  or db so use urlencoded
app.use(cookieParser()); // use it 

import { userRouter } from "./routes/User.js";
app.use("/api/v1", userRouter);

app.use(express.static(path.resolve("./frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve("./frontend/build/index.html"));
});
