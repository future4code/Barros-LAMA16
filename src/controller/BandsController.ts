import { BandsBusiness } from './../business/BandsBusiness';
import { Request, Response } from "express"

export class BandsController {
    bandsBusiness = new BandsBusiness()

    getAllBands = async (req:Request, res:Response) =>{
        try {
            const result = await this.bandsBusiness.getAllBands()
            res.status(200).send(result)
        } catch (error:any) {
            res.status(400).send(error.message);
        }
    }

    register = async (req:Request, res:Response)=>{

        const authToken = req.headers.authorization as string

        try {
            const newBand = {
                nameBand: req.body.nameBand,
                musicGenre : req.body.musicGenre,
                responsible : req.body.responsible,
                authToken : authToken
            }
            console.log(newBand);
            

            await this.bandsBusiness.register(newBand)

            res.status(200).send({message:'Banda registrada com sucesso.'})
        } catch (error:any) {
            res.status(400).send(error.message)
        }
    }

    getBandById = async (req:Request, res:Response)=>{
        try {
            const {id} = req.params
            const result = await this.bandsBusiness.getBandById(id)
            res.status(200).send({message:'resultados:', result})
        } catch (error:any) {
        res.status(400).send(error.message);
        }
    }
}