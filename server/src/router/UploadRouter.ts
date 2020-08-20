import Express from "express";
import multer from "multer";
import path from "path";
import { Error } from "mongoose";
import { ResponseHelper } from "./ResponseHelper";

const storage = multer.diskStorage({
    destination: path.resolve(__dirname, "../../public/upload"),
    // 配置文件存储名称
    filename(req, file, cb) {
        console.log(req.body);
        const time = new Date().getTime();
        const originalName = file.originalname;
        const extName = path.extname(originalName);
        cb(null, time + originalName);
    }
})
const allowExt = [".jpg", ".png", ".gif", ".bmp", ".jiff"];
const uploade = multer({
    storage,
    limits: {
        fileSize: 1024*1024
    },
    fileFilter(req, file, cb){
        const extName = path.extname(file.originalname);
        if(allowExt.includes(extName)){
            cb(null, true);
        }else{
            cb(new Error("文件类型不正确"))
        }
    }
}).single("imgfile");

const router = Express.Router();

router.post("/", (req, res) => {
    uploade(req, res, (err) => {
        if (err) {
            ResponseHelper.sendError(err.message, res);
        } else {
            const url = `/upload/${req.file.filename}`
            ResponseHelper.sendData(url, res);
        }
    });
})

export default router