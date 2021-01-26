import Express, { json } from "express";
import { MovieService } from "../services/MovieService";
import { ResponseHelper } from "./ResponseHelper";

const router = Express.Router();
router.get("/:id", (req, res) => {
    const id = req.params.id;
    MovieService.findById(id).then(data => {
        ResponseHelper.sendData(data, res);
    }, err => {
        // console.log(err);
        ResponseHelper.sendError("查询失败" + err, res);
    })
})

router.get("/", async (req, res) => {
    try {
        const result = await MovieService.find(req.query);
        ResponseHelper.sendData(result, res);
    } catch (err) {
        // console.log(err);
        ResponseHelper.sendError("查询失败" + err, res);
    }
})

router.post("/", (req, res) => {
    MovieService.add(req.body).then(data => {
        if (Array.isArray(data)) {
            throw new Error(data.join(';'));
        }
        ResponseHelper.sendData(data, res);
    }).catch(err => {
        // console.log(err);
        ResponseHelper.sendError("插入失败" + err, res);
    })
})

router.put("/:id", (req, res) => {
    MovieService.edit(req.params.id, req.body).then(data => {
        ResponseHelper.sendData(data, res);
    }, err => {
        // console.log(err);
        ResponseHelper.sendError("修改失败" + err, res);
    })
})

router.delete("/:id", (req, res) => {
    MovieService.delete(req.params.id).then(data => {
        ResponseHelper.sendData(data, res);
    }, err => {
        // console.log(err);
        ResponseHelper.sendError("删除失败" + err, res);
    })
})
export default router;