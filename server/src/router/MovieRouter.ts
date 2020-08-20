import Express from "express";
import { MovieService } from "../services/MovieService";
import { ResponseHelper } from "./ResponseHelper";

const router = Express.Router();

router.get("/:id", async (req, res) => {
    try {
        const movieId = req.params.id;
        const movie = await MovieService.findById(movieId);
        ResponseHelper.sendData(movie, res);
    } catch (e) {
        ResponseHelper.sendError("查询失败", res);
    }
})
router.get("/", async (req, res) => {
    try {
        const condition: any = req.query;
        const movies = await MovieService.find(condition);
        ResponseHelper.sendPageData(movies, res);
    } catch (e) {
        ResponseHelper.sendError("查询失败", res);
    }
})
router.post("/", async (req, res) => {
    const movie = req.body;
    const result = await MovieService.add(movie);
    if(Array.isArray(result)){
        ResponseHelper.sendError(result, res);
    }else{
        ResponseHelper.sendData(result, res);
    }
 })
router.put("/:id", async (req, res) => {
    try{
        const id = req.params.id;
        const movie = req.body;
        const result = await MovieService.edit(id, movie);
        if(result.length > 0){
            ResponseHelper.sendError(result, res);
        }else{
            ResponseHelper.sendData("修改成功", res);
        }
    }catch(e){
        ResponseHelper.sendError("id错误", res);
    }
})
router.delete("/:id", async (req, res) => {
    try{
        const id = req.params.id;
        const result = await MovieService.delete(id);
        console.log(result);
        ResponseHelper.sendData("删除成功", res);
    }catch(e){
        ResponseHelper.sendError("id错误", res);
    }
})

export default router;



