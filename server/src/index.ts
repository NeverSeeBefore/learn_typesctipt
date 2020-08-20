import "reflect-metadata";
import Express from "express";
import MovieRouter from "./router/MovieRouter";
import UploadRouter from "./router/UploadRouter";
const app = Express();

app.use("/upload", Express.static("public/upload"));

app.use(Express.json()); // 使用Express.json()中间件，用于解析消息体中的json数据
app.use("/api/movie", MovieRouter);
app.use("/api/upload", UploadRouter);


app.listen("3000");