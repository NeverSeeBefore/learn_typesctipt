import "reflect-metadata";
import Express from "express";
import { Movie } from "./entities/Movie";
import { SearchCondition } from "./entities/SearchCondition";
import { MovieService } from "./services/MovieService";
import MovieRouter from "./routes/MovieRoute";
import UploadRouter from "./routes/UploadRoute";

const condition: any = { page: 1, limit: 5, key: '电影名称1' }


const app = Express();

app.use(Express.json()); // 配置中间件，用于解析消息体中的json格式数据

app.use("/api/movie", MovieRouter);
app.use("/api/upload", UploadRouter);

app.listen(8998, () => console.log('server is listening on 8998'));