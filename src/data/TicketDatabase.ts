import { BaseDatabase } from "./BaseDatabase";

export class TicketDatabase extends BaseDatabase{

    TABLE_NAME = 'LAMA_Tickets'
    
    createTicket = async (ticket:any)=>{
        try {
            const {id, nameTicket, value, showId, qtdTicket} = ticket

            await TicketDatabase.connection(this.TABLE_NAME)
                .insert({
                    id,
                    name_ticket: nameTicket,
                    value,
                    show_id: showId,
                    qtd_available: qtdTicket,
                })

        } catch (error:any) {
            throw new Error(error.message);
        }
    }

    deleteTicket = async (id:any)=>{
        try {
            await TicketDatabase.connection(this.TABLE_NAME)
                .delete()
                .where({id})

        } catch (error:any) {
            throw new Error(error.message);
        }
    }

    getAllTicket = async ()=>{
        try {
            const result = await TicketDatabase.connection(this.TABLE_NAME)
                .select()
            return result    
        } catch (error:any) {
            throw new Error(error.message);
        }
    }

    getTicketById = async (id:string)=>{
        try {
          const result = await TicketDatabase.connection(this.TABLE_NAME)
          .select()
          .where({
            id:id
          })
          return result
        } catch (error:any) {
          throw new Error(error.message);
        }
      }
}