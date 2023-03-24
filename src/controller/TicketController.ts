import { Request, Response } from "express";
import { TicketBusiness } from "../business/TicketBusiness";
import { TicketsDTO } from "../model/tickets";

export class TicketController{
    ticketBusiness = new TicketBusiness()

    createTicket = async (req:Request, res:Response)=>{
        try {
            const {showId} = req.params
            const authToken = req.headers.authorization as string

            const newTicket:TicketsDTO = {
                nameTicket: req.body.nameTicket,
                value: req.body.value,
                qtdTicket: req.body.qtdTicket,
                showId,
            }

            await this.ticketBusiness.createTicket(newTicket, authToken)

            res.status(200).send({message: 'Ingresso criado com sucesso.', authToken})
        } catch (error:any) {
            res.status(400).send(error.message);
        }
    }

    deleteTicket = async (req:Request, res:Response)=>{
        try {
            const {id} = req.params
            const authToken = req.headers.authorization as string

            await this.ticketBusiness.deleteTicket(id, authToken)
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