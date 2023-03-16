import { ShowsDatabase } from '../data/ShowsDatabase';
import { UserDatabase } from '../data/UserDatabase';
import { Authenticator } from '../services/Authenticator';
import { IdGenerator } from '../services/IdGenerator';
import { TicketDatabase } from './../data/TicketDatabase';
export class TicketBusiness{

   ticketDatabase = new TicketDatabase()
   generateId = new IdGenerator()
   showDatabase= new ShowsDatabase()
   userDatabase = new UserDatabase()
   authenticator = new Authenticator();
    
    createTicket = async (ticket:any)=>{
        try {
            const {nameTicket, value, showId, qtdTicket, authToken} = ticket

            if(!authToken) throw new Error("Token nao informado");
            const token = this.authenticator.getData(authToken)
            if(!token) throw new Error("Nao autorizado")
            
            const verifyRole = await this.userDatabase.getProfile(token)
            if(verifyRole.role !== 'ADMIN') throw new Error("Voce nao esta permitido para realizar esta acao.")

            if (nameTicket || value || qtdTicket) throw new Error("Todos os campos precisam ser informados.");
            
            const verifyShow = await this.showDatabase.getShowById(showId)
            if(verifyShow.length !== 1) throw new Error("Show nao encontrado.");

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

   deleteTicket = async (ticket:any)=>{
        try {
            const {id, authToken} = ticket
            if(!authToken) throw new Error("Token nao informado");
            const token = this.authenticator.getData(authToken)
            if(!token) throw new Error("Nao autorizado")

            const verifyRole = await this.userDatabase.getProfile(token)
            if(verifyRole.role !== 'ADMIN') throw new Error("Voce nao esta permitido para realizar esta acao.")

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