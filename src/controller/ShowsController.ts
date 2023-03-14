import { Request, Response } from "express";
import { ShowsBusiness } from "../business/Showsbusiness";


export class ShowController {
    showsBusiness = new ShowsBusiness()
    registerShow = async (req:Request, res:Response)=>{
        try {
            const newShow = {
                weekDay : req.body.weekDay,
                startTime : req.body.startTime,
                endTime : req.body.endTime,
                bandId : req.params
            }

            await this.showsBusiness.registerShow(newShow)
            res.status(200).send('Banda foi registrada com sucesso.')
        } catch (error:any) {
            res.status(200).send(error.message);
        }
    }
}