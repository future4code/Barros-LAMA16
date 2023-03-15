import { Request, Response } from "express";
import { PurchaseBusiness } from "../business/PurchaseBusiness";

export class PurchaseController{
    purchaseBusiness = new PurchaseBusiness()

    ticketPurchase = async (req:Request, res:Response)=>{
        try {
           const {userId} = req.params
           const {showId} = req.params
           const {ticketId} = req.params
           const {qtdPurchase} = req.body

           const newTicket = {
            userId, 
            showId, 
            ticketId, 
            qtdPurchase
           }
           
           await this.purchaseBusiness.ticketPurchase(newTicket)
           res.status(200).send({message:'Compra realizada com sucesso.'})
        } catch (error:any) {
           res.status(200).send(error.message);
        }
    }
}