import { Response } from "express";
import { ISearchResult } from "../entities/CommonTypes";

export class ResponseHelper {
    public static sendError(error: string | string[], res: Response) {
        if (Array.isArray(error)) {
            error = error.join(";");
        }
        res.send({
            err: error,
            data: null
        })
    }
    public static sendData(data: any, res: Response) {
        res.send({
            err: null,
            data
        })
    }
    public static sendPageData<T>(data: ISearchResult<T>, res: Response) {
        if(data.errors.length > 0){
            this.sendError(data.errors, res);
        }else{
            res.send({
                err: null,
                data: data.data,
                total: data.count
            })
        }
    }
}