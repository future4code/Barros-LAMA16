import { IdGenerator } from './../services/IdGenerator';
import { ShowsDatabase } from "../data/ShowsDatabase"
import { BandsDatabase } from '../data/BandsDatabase';

export class ShowsBusiness{
    showsDatabase = new ShowsDatabase()
    idGenerator = new IdGenerator()
    bandDatabase = new BandsDatabase()

    getAllShows = async ()=>{
        try {
            const result = await this.showsDatabase.getAllShows()
            return result       
        } catch (error:any) {
            throw new Error(error.message);
        }
    }

    registerShow = async (show:any)=>{
        try {
            const { weekDay, startTime, endTime, bandId} = show
            if(!weekDay || !startTime || !endTime) throw new Error("todos os campos precisam ser preenchidos.");
            if(!bandId) throw new Error("o id nao foi inserido.");
            
            const bandExist = await this.bandDatabase.getBandById(bandId.id)
            
            if(bandExist.length !== 1) throw new Error("Banda nao encontrada ou banda nao registrada.");
            if(startTime > endTime) throw new Error("Formato invalido.. o inicio do show nao pode ser apos o termino do mesmo.");
            if(startTime < 8 || startTime > 22) throw new Error("Horario permitido para iniciar o show e entre 8H as 22H");
            if(endTime < 9 || endTime > 23) throw new Error("Horario permitido para termino do show e entre 9H as 23H")
            
            const verifyHourShow = (endTime - startTime)
            if(verifyHourShow !== 1) throw new Error("O show deve somente ser de 1 hora de apresentação.");
            
            

            const verifyHour = await this.showsDatabase.verifyHour(startTime)
            if(verifyHour[0].week_day === weekDay && verifyHour[0].start_time === startTime ) throw new Error("Ja existe um show nesta data e horario");
        
            const id = this.idGenerator.generate()

            const newShow = {
                id,
                weekDay,
                startTime,
                endTime,
                bandId: bandId.id
            }

            if(weekDay === 'Sexta'  || weekDay === 'Sábado' || weekDay === 'Domingo'){
                await this.showsDatabase.registerShow(newShow)
                
            } else{
                throw new Error("Dia da semana invalido");
            }
            

        } catch (error:any) {
            throw new Error(error.message);
        }
    }

    getAllShowsByDay = async (day:string)=>{
        try {
            if(!day) throw new Error("Dia nao informado.")
            
            if(day === 'Sexta'  || day === 'Sábado' || day === 'Domingo'){
                const result = await this.showsDatabase.getAllShowsByDay(day)  
                return result        
            } else{
                throw new Error("Dia da semana invalido");
            }
        } catch (error:any) {
            throw new Error(error.message);
            
        }
    }

}