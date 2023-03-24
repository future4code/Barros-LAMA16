import { PurchaseDatabase } from "../data/PurchaseDatabase";
import { ShowsDatabase } from "../data/ShowsDatabase";
import { UserDatabase } from "../data/UserDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { TicketDatabase } from '../data/TicketDatabase';
import { Purchase, PurchaseDTO } from "../model/purchase";
import { QtdFormat, QtdNotInserted } from "../error/purchaseError";
import { ShowNotFound, TicketNotFound, UserNotFound } from "../error/customError";

export class PurchaseBusiness{

    purchaseDatabase = new PurchaseDatabase()
    userDatabase = new UserDatabase()
    showDatabase= new ShowsDatabase()
    ticketDatabase = new TicketDatabase()
    generate = new IdGenerator()

    ticketPurchase = async (ticket:PurchaseDTO)=>{
        try {
            const {userId, showId, ticketId, qtdPurchase} = ticket

            if(!qtdPurchase) throw new QtdNotInserted
            if(isNaN(qtdPurchase)) throw new QtdFormat
            

            const verifyUser = await this.userDatabase.getUserById(userId)
            if(verifyUser.length !== 1) throw new UserNotFound

            const verifyShow = await this.showDatabase.getShowById(showId)
            if(verifyShow.length !== 1) throw new ShowNotFound
            
            const verifyTicket = await this.ticketDatabase.getTicketById(ticketId)
            if(verifyTicket.length !== 1) TicketNotFound

            

            const id = this.generate.generate()

            const newTicket:Purchase = {
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

    allTicketsPurchase = async ()=>{
        try {
            const result = await this.purchaseDatabase.getTicketById()
            
            return result
        } catch (error:any) {
            throw new Error(error.message);
        }
    }
}