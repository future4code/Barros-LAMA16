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
        
        if(!name || !email || !password) throw new BodyNotInserted
        if(verifyEmail.length == 1) throw new EmailExist
        console.log(verifyEmail.length);
        if(!email.includes('@')) throw new EmailFormat
        
        const idGenerator = new IdGenerator();
        const id = idGenerator.generate();

        const newUser = {
            id,
            name,
            email,
            password,
            role
        }
        const token = this.authenticator.generateToken({id})

        await this.userDatabase.signup(newUser);
        
        return token
    }

    login = async(user: LoginInputDTO)=>{

            const {email, password} = user

            const verifyEmail = await this.userDatabase.getUserByEmail(email as string)
            if(verifyEmail.length !== 1) throw new UserNotFound
            if(verifyEmail[0].password !== password) throw new PasswordWrong

            const token = this.authenticator.generateToken({id: verifyEmail[0].id})
            return token
            
    }

    getProfile = async (authToken:string)=>{
        try {

            if(!authToken) throw new TokenNotInserted
            
            const token = this.authenticator.getData(authToken) 

            if(!token) throw new NotAuthorized

            const result = await this.userDatabase.getProfile(token)
            return result
        } catch (error:any) {
            throw new Error(error.message);
        }
    }
}