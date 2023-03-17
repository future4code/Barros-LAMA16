import { TokenNotInserted, NotAuthorized } from './../error/customError';
import { PasswordWrong } from './../error/UserError';
import { UserDatabase } from './../data/UserDatabase';
import { UserInputDTO, LoginInputDTO } from "../model/User";
import { IdGenerator } from "../services/IdGenerator";
import { Authenticator } from '../services/Authenticator';
import { BodyNotInserted, UserNotFound } from '../error/customError';
import { EmailExist, EmailFormat } from '../error/UserError';

export class UserBusiness {
    userDatabase = new UserDatabase()
    authenticator = new Authenticator()

    signup = async (user: UserInputDTO)=> {

        const {name, email, password, role} = user
        const verifyEmail = await this.userDatabase.getUserByEmail(email)
        
        if(!name || !email || !password) throw BodyNotInserted
        if(verifyEmail.length > 0) throw EmailExist
        if(!email.includes('@')) throw EmailFormat

        const idGenerator = new IdGenerator();
        const id = idGenerator.generate();

        const newUser = {
            id,
            name,
            email,
            password,
            role
        }
        await this.userDatabase.signup(newUser);
        const token = this.authenticator.generateToken({id})
        return token
    }

    login = async(user: LoginInputDTO)=>{

            const {email, password} = user

            const verifyEmail = await this.userDatabase.getUserByEmail(email as string)
            if(verifyEmail.length !== 1) throw UserNotFound
            if(verifyEmail[0].password !== password) throw PasswordWrong

            const token = this.authenticator.generateToken({id: verifyEmail[0].id})
            return token
            
    }

    getProfile = async (authToken:string)=>{
        try {

            if(!authToken) throw TokenNotInserted
            
            const token = this.authenticator.getData(authToken) 

            if(!token) throw NotAuthorized

            const result = await this.userDatabase.getProfile(token)
            return result
        } catch (error:any) {
            throw new Error(error.message);
        }
    }
}