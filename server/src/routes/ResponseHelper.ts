import { Response } from "express";


export class ResponseHelper {
    public static sendError(errors: string | string[], res: Response) {
        let err: string;
        if(Array.isArray(errors)) {
            err = errors.join(";");
        }
        else {
            err = errors;
        }

        res.send({
            err,
            data: null
        })
    }

    public static sendData(data: any, res: Response) {

        const err = '';
        if (data && Array.isArray(data.errors) && data.errors.length > 0) {
            data.errors.join(';');
        }
        res.send({
            err,
            data
        })
    }
}