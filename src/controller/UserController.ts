import { Request, Response } from "express";
import { UserInputDTO, LoginInputDTO} from "../model/User";
import { UserBusiness } from "../business/UserBusiness";

export class UserController {
   userBusiness = new UserBusiness();

    signup = async (req: Request, res: Response)=> {
        try {

            const newUser: UserInputDTO = {
                email: req.body.email,
                name: req.body.name,
                password: req.body.password,
                role: req.body.role
            }

            const token = await this.userBusiness.signup(newUser)

            res.status(200).send({message:'Cadastro realizado com sucesso.', token})

        } catch (error:any) {
            res.status(400).send({ error: error.message });
        }
    }

    login = async(req: Request, res: Response)=> {

        try {
            const loginData: LoginInputDTO = {
                email: req.body.email,
                password: req.body.password
            };

            const token = await this.userBusiness.login(loginData)

            res.status(200).send({message:'Login realizado com sucesso.', token})
        } catch (error:any) {
            res.status(400).send({ error: error.message });
        }
    }

}