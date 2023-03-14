import { UserDatabase } from './../data/UserDatabase';
import { UserInputDTO, LoginInputDTO, AuthenticatorData } from "../model/User";
import { IdGenerator } from "../services/IdGenerator";
import { Authenticator } from '../services/Authenticator';

export class UserBusiness {
    userDatabase = new UserDatabase()
    authenticator = new Authenticator()

    signup = async (user: UserInputDTO)=> {

        const {name, email, password, role} = user
        const verifyEmail = await this.userDatabase.getUserByEmail(email)
        
        if(!name || !email || !password) throw new Error('Todos os campos devem ser preenchidos.')
        if(verifyEmail.length > 0) throw new Error('ja extste um usuario ja cadastrado com este endereco de email.')
        if(!email.includes('@')) throw new Error('Formato de email invalido.')

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
            if(verifyEmail.length !== 1) throw new Error("Usuario nao localizado.");
            if(verifyEmail[0].password !== password) throw new Error("Senha invalida");

            const token = this.authenticator.generateToken({id: verifyEmail[0].id})
            return token
            
    }

    getProfile = async (authToken:string)=>{
        try {

            if(!authToken) throw new Error("Token nao foi inserido.");
            
            const token = this.authenticator.getData(authToken) 

            if(!token) throw new Error("Nao autorizado")

            const result = await this.userDatabase.getProfile(token)
            return result
        } catch (error:any) {
            throw new Error(error.message);
        }
    }
}