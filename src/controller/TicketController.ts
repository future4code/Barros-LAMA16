import { Request, Response } from "express";
import { TicketBusiness } from "../business/TicketBusiness";

export class TicketController{
    ticketBusiness = new TicketBusiness()

    createTicket = async (req:Request, res:Response)=>{
        try {
            const {nameTicket, value, qtdTicket} = req.body
            const {showId} = req.params

            const newTicket = {
                nameTicket,
                value,
                qtdTicket,
                showId
            }

            await this.ticketBusiness.createTicket(newTicket)

            res.status(200).send({message: 'Ingresso criado com sucesso.'})
        } catch (error:any) {
            res.status(400).send(error.message);
        }
    }

    deleteTicket = async (req:Request, res:Response)=>{
        try {
            const {id} = req.params
            await this.ticketBusiness.deleteTicket(id)
            res.status(200).send({message: 'Ingresso deletado com sucesso.'})
        } catch (error:any) {
            res.status(400).send(error.message);
        }
    }

    getAllTicket = async (req:Request, res:Response)=>{
        try {
            const result = await this.ticketBusiness.getAllTicket()
            res.status(200).send({message: 'Lista exibida.', result})
        } catch (error:any) {
            res.status(400).send(error.message);
        }
    }
}