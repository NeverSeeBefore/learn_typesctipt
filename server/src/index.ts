import "reflect-metadata";
import Express from "express";
import MovieRouter from "./routes/MovieRoute";
import UploadRouter from "./routes/UploadRoute";
import path from 'path';
import history from "connect-history-api-fallback";

const condition: any = { page: 1, limit: 5, key: '电影名称1' }


const app = Express();

app.use(Express.json()); // 配置中间件，用于解析消息体中的json格式数据
app.use(history()); // 静态文件的请求，都转到index.html


app.use("/", Express.static(path.resolve(__dirname, '../public/build/')));

app.use("/api/movie", MovieRouter);
app.use("/api/upload", UploadRouter);

app.listen(8998, () => console.log('server is listening on 8998'));