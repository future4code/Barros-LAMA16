import { PurchaseDatabase } from "../data/PurchaseDatabase";
import { IdGenerator } from "../services/IdGenerator";

export class PurchaseBusiness{

    purchaseDatabase = new PurchaseDatabase()
    generate = new IdGenerator()

    ticketPurchase = async (ticket:any)=>{
        try {
            const {userId, showId, ticketId, qtdPurchase} = ticket

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