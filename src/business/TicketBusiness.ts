import { IdGenerator } from '../services/IdGenerator';
import { TicketDatabase } from './../data/TicketDatabase';
export class TicketBusiness{

   ticketDatabase = new TicketDatabase()
   generateId = new IdGenerator()
    
    createTicket = async (ticket:any)=>{
        try {
            const {nameTicket, value, showId, qtdTicket} = ticket

            const id = this.generateId.generate()

            const newTicket = {
                id,
                nameTicket,
                value,
                showId,
                qtdTicket
            }

            await this.ticketDatabase.createTicket(newTicket)
        
        } catch (error:any) {
            throw new Error(error.message);
        }
    }

   deleteTicket = async (id:any)=>{
        try {
            await this.ticketDatabase.deleteTicket(id)
        } catch (error:any) {
            throw new Error(error.message);
        }
    }

    getAllTicket = async ()=>{
        try {
            const result = await this.ticketDatabase.getAllTicket()
            return result
        } catch (error:any) {
            throw new Error(error.message);
        }
    }
}