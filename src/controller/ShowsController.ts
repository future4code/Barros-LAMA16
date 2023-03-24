import { Request, Response } from "express";
import { ShowsBusiness } from "../business/Showsbusiness";
import { ShowDTO } from "../model/Shows";


export class ShowController {
    showsBusiness = new ShowsBusiness()

    getAllShows = async (req:Request, res:Response)=>{
        try {
            const result = await this.showsBusiness.getAllShows()
            res.status(200).send(result)
        } catch (error:any) {
            res.status(400).send(error.message);
        }
    }

    registerShow = async (req:Request, res:Response)=>{
        try {
            const bandId = req.params
            
            const newShow:ShowDTO = {
                weekDay : req.body.weekDay,
                startTime : req.body.startTime,
                endTime : req.body.endTime,
            }
            
            await this.showsBusiness.registerShow(newShow, bandId)
            res.status(200).send('Banda foi registrada com sucesso.')
        } catch (error:any) {
            res.status(200).send(error.message);
        }
    }

    getAllShowsByDay = async (req:Request, res:Response)=>{
        try {
            const {day} = req.params
            const result = await this.showsBusiness.getAllShowsByDay(day)
            res.status(200).send(result)
        } catch (error:any) {
            res.status(400).send(error.message);
        }
    }

}