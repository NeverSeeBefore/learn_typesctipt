import Express from "express";
import multer from "multer";
import path from "path";
import { ResponseHelper } from "./ResponseHelper";

const storage = multer.diskStorage({
    destination: path.resolve(__dirname, "../../public/uploads"),
    filename(req, file, cb) {
        console.log(file);
        const time = Date.now();
        const originalname = file.originalname;
        // const extname = path.extname(file.originalname);
        cb(null, time + '-' + originalname);
    }
})

const upload = multer({
    storage,
    limits: {
        fieldSize: 1024 * 1024 // 文件上传尺寸
    },
    fileFilter(req, file, cb) {

        // 这个函数应该调用 `cb` 用boolean值来
        // 指示是否应接受该文件
        // 限制文件后缀名

        // 拒绝这个文件，使用`false`，像这样:
        // cb(null, false)

        // 接受这个文件，使用`true`，像这样:
        cb(null, true)

        // 如果有问题，你可以总是这样发送一个错误:
        // cb(new Error('I don\'t have a clue!'))

    }
});

const router = Express.Router();

router.post("/", upload.single("imgfile"), (req, res) => {
    const fileName = `/api/uploads/${req.file.filename}`
    ResponseHelper.sendData(fileName, res);
})

// 捕获上传文件中的错误
// router.post("/", (req, res) => {
//     upload.single("imgfile")(req, res, (err,) => {
//         if (err instanceof multer.MulterError) {
//           // 发生错误
//             return ResponseHelper.sendError("上传失败" + JSON.stringify(err), res);
//         } if (err) {
//           // 发生错误
//             return ResponseHelper.sendError("上传失败" + JSON.stringify(err), res);
//         }
//         // 一切都好
//         console.log(req.file);
//         return ResponseHelper.sendData('上传成功' + JSON.stringify(req.file), res);
//       })
// })

export default router;