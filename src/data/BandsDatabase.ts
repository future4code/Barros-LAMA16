import { BaseDatabase } from "./BaseDatabase";

export class BandsDatabase extends BaseDatabase{
    TABLE_NAME = 'LAMA_Bands'

    getAllBands = async () =>{
        try {
            const result = await BandsDatabase.connection(this.TABLE_NAME)
                .select()
                return result
        } catch (error:any) {
            throw new Error(error.message);
        }
    }

    register = async (Band:any)=>{
        try {
            await BandsDatabase.connection(this.TABLE_NAME)
                .insert(Band)
        } catch (error:any) {
            throw new Error(error.message);
        }
    }

    searchByNameBand = async (nameBand:string)=>{
        try {
            const result = await BandsDatabase.connection(this.TABLE_NAME)
                .select()
                .where({
                    name_band:nameBand
                })
            return result
        } catch (error:any) {
            throw new Error(error.message);
        }
    }

    getBandById = async (id:string)=>{
        try {
            const result = await BandsDatabase.connection(this.TABLE_NAME)
                .select()
                .where({id})
            return result    
        } catch (error:any) {
            throw new Error(error.message);
        }
    }

}