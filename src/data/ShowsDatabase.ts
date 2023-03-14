import { BaseDatabase } from "./BaseDatabase";

export class ShowsDatabase extends BaseDatabase{
    TABLE_NAME = 'LAMA_Shows'
    registerShow = async (show:any)=>{
        try {
            const {id, weekDay, startTime, endTime, bandId } = show

            const newShow = {
                id,
                week_day: weekDay,
                start_time: startTime,
                end_time: endTime,
                band_id: bandId,
            }

            await ShowsDatabase.connection(this.TABLE_NAME)
                .insert(newShow)
                
        } catch (error:any) {
            throw new Error(error.message);
        }
    }
}