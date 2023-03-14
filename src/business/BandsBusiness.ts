import { BandsDatabase } from '../data/BandsDatabase';
import { UserDatabase } from '../data/UserDatabase';
import { IdGenerator } from './../services/IdGenerator';

export class BandsBusiness{
    idGenerator = new IdGenerator();
    bandsDatabase = new BandsDatabase()
    userDatabase = new UserDatabase()

    register = async (Band:any) =>{
        try {
            const {nameBand, musicGenre, responsible} = Band
            if(!nameBand || !musicGenre || !responsible) throw new Error('Todos os campos precisam ser informados.');

            const verifyName = await this.bandsDatabase.searchByNameBand(nameBand)
            if(verifyName.length === 1) throw new Error("Já existe uma banda com este nome.");

           const id = this.idGenerator.generate()

            const newBand = {
                id,
                name_band: nameBand,
                music_genre: musicGenre,
                responsible
            }

            await this.bandsDatabase.register(newBand)
            
        } catch (error:any) {
            throw new Error(error.message)
        }
    }

    getBandById = async (id:string)=>{
        try {
           const result = await this.bandsDatabase.getBandById(id)
           if(result.length != 1) throw new Error("Banda nao encontrada.");

           return result
           
           
        } catch (error:any) {
            throw new Error(error.message);
        }
    }
}