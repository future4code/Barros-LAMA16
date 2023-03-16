import { Purchase } from "../model/purchase";
import { BaseDatabase } from "./BaseDatabase";

export class PurchaseDatabase extends BaseDatabase{
    TABLE_NAME = 'LAMA_Ticket_purchase'

    ticketPurchase = async (ticket:Purchase)=>{
        try {
            const {id, userId, showId, ticketId, qtdPurchase} = ticket

            await PurchaseDatabase.connection(this.TABLE_NAME)
            .insert(
                    {
                        id:id,
                        user_id : userId,
                        show_id:showId,
                        ticket_id: ticketId,
                        qtd_purchase: qtdPurchase,

                    }
                )
        } catch (error:any) {
            throw new Error(error.message);
        }
    }

    getTicketById = async ()=>{
        try {
            const result = await PurchaseDatabase.connection(this.TABLE_NAME)
                .select('name', 'name_ticket', 'week_day', 'start_time')
                .join("LAMA_Users","LAMA_Ticket_purchase.user_id","=","LAMA_Users.id")
                .join("LAMA_Shows","LAMA_Ticket_purchase.show_id","=","LAMA_Shows.id")
                .join("LAMA_Tickets","LAMA_Ticket_purchase.ticket_id","=","LAMA_Tickets.id")

            return result

        } catch (error:any) {
            throw new Error(error.message);
            
        }
    }
}