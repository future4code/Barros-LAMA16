import { BandsBusiness } from './../business/BandsBusiness';
import { Request, Response } from "express"

export class BandsController {
    bandsBusiness = new BandsBusiness()
    register = async (req:Request, res:Response)=>{
        try {
            const newBand = {
                nameBand: req.body.nameBand,
                musicGender : req.body.musicGender,
                responsible : req.body.responsible
            }

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