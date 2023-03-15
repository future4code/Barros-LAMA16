import { PurchaseDatabase } from "../data/PurchaseDatabase";
import { ShowsDatabase } from "../data/ShowsDatabase";
import { UserDatabase } from "../data/UserDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { TicketDatabase } from '../data/TicketDatabase';

export class PurchaseBusiness{

    purchaseDatabase = new PurchaseDatabase()
    userDatabase = new UserDatabase()
    showDatabase= new ShowsDatabase()
    ticketDatabase = new TicketDatabase()
    generate = new IdGenerator()

    ticketPurchase = async (ticket:any)=>{
        try {
            const {userId, showId, ticketId, qtdPurchase} = ticket

            if(!qtdPurchase) throw new Error("Quantidade nao informada")
            if(isNaN(qtdPurchase)) throw new Error("A quantidade deve ser informada em formato de numero.");
            

            const verifyUser = await this.userDatabase.getUserById(userId)
            if(verifyUser.length !== 1) throw new Error("Usuario nao encontrado.");

            const verifyShow = await this.showDatabase.getShowById(showId)
            if(verifyShow.length !== 1) throw new Error("Show nao encontrado.");
            
            const verifyTicket = await this.ticketDatabase.getTicketById(ticketId)
            if(verifyTicket.length !== 1) throw new Error("ticket nao encontrado.");

            

            const id = this.generate.generate()

            const newTicket = {
                id,
                userId,
                showId,
                ticketId,
                qtdPurchase
            }

            await this.purchaseDatabase.ticketPurchase(newTicket)
            
        } catch (error:any) {
            throw new Error(error.message);
        }
    }
}