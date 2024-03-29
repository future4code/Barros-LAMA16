import { NameNotInserted, QtdTicket, ValueTicketNotInserted } from './../error/TicketError';
import { NotAuthorized, ShowNotFound, TicketNotFound, TokenNotInserted } from './../error/customError';
import { ShowsDatabase } from '../data/ShowsDatabase';
import { UserDatabase } from '../data/UserDatabase';
import { Ticket, TicketsDTO } from '../model/tickets';
import { Authenticator } from '../services/Authenticator';
import { IdGenerator } from '../services/IdGenerator';
import { TicketDatabase } from './../data/TicketDatabase';

export class TicketBusiness{

   ticketDatabase = new TicketDatabase()
   generateId = new IdGenerator()
   showDatabase= new ShowsDatabase()
   userDatabase = new UserDatabase()
   authenticator = new Authenticator();
    
    createTicket = async (ticket:TicketsDTO, authToken:string)=>{
        try {
            const {nameTicket, value, showId, qtdTicket,} = ticket

            if(!authToken) throw new TokenNotInserted
            const token = this.authenticator.getData(authToken)
            if(!token) throw new TokenNotInserted
            
            const verifyRole = await this.userDatabase.getProfile(token)
            if(verifyRole.role !== 'ADMIN') throw new NotAuthorized

            if (!nameTicket ) throw new NameNotInserted
            if (!qtdTicket ) throw new QtdTicket
            if (!value ) throw new ValueTicketNotInserted
            
            const verifyShow = await this.showDatabase.getShowById(showId)
            if(verifyShow.length !== 1) throw new ShowNotFound

            const id = this.generateId.generate()

            const newTicket:Ticket = {
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

   deleteTicket = async (id:string, authToken:string)=>{
        try {

            if(!authToken) throw new TokenNotInserted
            const token = this.authenticator.getData(authToken)
            if(!token) throw new TokenNotInserted

            const verifyRole = await this.userDatabase.getProfile(token)
            if(verifyRole.role !== 'ADMIN') throw new NotAuthorized

            const verifyTicket = await this.ticketDatabase.getTicketById(id)
            if(verifyTicket.length !== 1) throw new TicketNotFound
            
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