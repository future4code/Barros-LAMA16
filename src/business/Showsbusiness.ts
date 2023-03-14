import { IdGenerator } from './../services/IdGenerator';
import { ShowsDatabase } from "../data/ShowsDatabase"

export class ShowsBusiness{
    showsDatabase = new ShowsDatabase()
    idGenerator = new IdGenerator()
    registerShow = async (show:any)=>{
        try {
            const { weekDay, startTime, endTime, bandId} = show
            if(!weekDay || !startTime || !endTime || !bandId) throw new Error("todos os campos precisam ser preenchidos.");
            
            const id = this.idGenerator.generate()
            const newShow = {
                id,
                weekDay,
                startTime,
                endTime,
                bandId
            }

            await this.showsDatabase.registerShow(newShow)

        } catch (error:any) {
            throw new Error(error.message);
        }
    }
}