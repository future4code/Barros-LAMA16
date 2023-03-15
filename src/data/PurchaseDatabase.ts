import { BaseDatabase } from "./BaseDatabase";

export class PurchaseDatabase extends BaseDatabase{
    TABLE_NAME = 'LAMA_Ticket_purchase'

    ticketPurchase = async (ticket:any)=>{
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
}