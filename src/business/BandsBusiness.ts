import { BandsDatabase } from '../data/BandsDatabase';
import { UserDatabase } from '../data/UserDatabase';
import { IdGenerator } from './../services/IdGenerator';
import { Authenticator } from '../services/Authenticator';
import { BandExist, BandNotFound, BodyNotInserted, NotAuthorized, NotAuthorizedAdmin, TokenNotInserted } from '../error/customError';

export class BandsBusiness{
    idGenerator = new IdGenerator();
    bandsDatabase = new BandsDatabase()
    userDatabase = new UserDatabase()
    authenticator = new Authenticator();

    getAllBands = async () =>{
        try {
            const result = await this.bandsDatabase.getAllBands()
            return result
        } catch (error:any) {
            throw new Error(error.message);
        }
    }

    register = async (Band:any) =>{
        try {
            const {nameBand, musicGenre, responsible, authToken} = Band
            if(!nameBand || !musicGenre || !responsible) throw BodyNotInserted
            
            if(!authToken) throw TokenNotInserted
            const token = this.authenticator.getData(authToken)
            
            if(!token) throw NotAuthorized
            
            const verifyRole = await this.userDatabase.getProfile(token)
            if(verifyRole.role !== 'ADMIN') throw NotAuthorizedAdmin
          
            const verifyName = await this.bandsDatabase.searchByNameBand(nameBand)
            if(verifyName.length === 1) throw BandExist
            
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
           if(result.length !== 1) throw BandNotFound

           return result
        } catch (error:any) {
            throw new Error(error.message);
        }
    }
}