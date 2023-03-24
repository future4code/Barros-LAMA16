import { FormatInvalidEndTime, FormatInvalidStartTime, FormatInvalidTime, HourNotAvailable, InvalidDay } from './../error/ShowError';
import { IdGenerator } from './../services/IdGenerator';
import { ShowsDatabase } from "../data/ShowsDatabase"
import { BandsDatabase } from '../data/BandsDatabase';
import { Show, ShowDTO } from '../model/Shows';
import { BandNotFound, BodyNotInserted } from '../error/customError';
import { FormatInvalidHour, IdBandNotInserted } from '../error/ShowError';

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

    registerShow = async (show:ShowDTO, bandId:any)=>{
        try {
            const { weekDay, startTime, endTime} = show
            if(!weekDay || !startTime || !endTime) throw new BodyNotInserted
            if(!bandId.id) throw new IdBandNotInserted
            
            const bandExist = await this.bandDatabase.getBandById(bandId.id)
            if(bandExist.length !== 1) throw new BandNotFound
            
            if(startTime > endTime) throw new FormatInvalidHour
            if(startTime < 8 || startTime > 22) throw new FormatInvalidStartTime
            if(endTime < 9 || endTime > 23) throw new FormatInvalidEndTime
            
            const verifyHourShow = (endTime - startTime)
            if(verifyHourShow !== 1) throw new FormatInvalidTime
            
            

            const verifyHour = await this.showsDatabase.verifyHour(startTime)
            if(verifyHour[0].week_day === weekDay && verifyHour[0].start_time === startTime ) throw new HourNotAvailable
        
            const id = this.idGenerator.generate()

            const newShow:Show = {
                id,
                weekDay,
                startTime,
                endTime,
            }

            if(weekDay === 'Sexta'  || weekDay === 'Sábado' || weekDay === 'Domingo'){
                await this.showsDatabase.registerShow(newShow, bandId.id)
                
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
                throw InvalidDay
            }
        } catch (error:any) {
            throw new Error(error.message);
            
        }
    }

}