
import { Show } from "../model/Shows";
import { BaseDatabase } from "./BaseDatabase";

export class ShowsDatabase extends BaseDatabase{
    TABLE_NAME = 'LAMA_Shows'

    getAllShows = async ()=>{
        try {
            const result = await ShowsDatabase.connection(this.TABLE_NAME)
                .select()
             return result   
        } catch (error:any) {
            throw new Error(error.message);
        }
    }

    registerShow = async (show:Show, bandId:string)=>{
        try {
            const {id, weekDay, startTime, endTime } = show

            const newShow = {
                id,
                week_day: weekDay,
                start_time: startTime,
                end_time: endTime,
                band_id: bandId,
            }
            console.log(newShow);
            

            await ShowsDatabase.connection(this.TABLE_NAME)
                .insert(newShow)
                
        } catch (error:any) {
            throw new Error(error.message);
        }
    }

    verifyHour = async (time:number)=>{
        try {
            const result = await ShowsDatabase.connection(this.TABLE_NAME)
            .select()
            .where({start_time:time})
            return result
        } catch (error:any) {
            throw new Error(error.message);
        }
    }

    getAllShowsByDay = async (day:string)=>{
        try {
            const result = await ShowsDatabase.connection(this.TABLE_NAME)
                .select('name_band', 'music_genre', 'start_time')
                .join('LAMA_Bands','LAMA_Shows.band_id','=','LAMA_Bands.id')
                .where({
                    week_day:day
                })
                .orderBy([
                    {column:'start_time', order:'asc'}
                ])
            return result    
        } catch (error:any) {
            throw new Error(error.message);
        }
    }

    getShowById = async (id:string)=>{
        try {
          const result = await ShowsDatabase.connection(this.TABLE_NAME)
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