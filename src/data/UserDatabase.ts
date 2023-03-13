import { BaseDatabase } from "./BaseDatabase";
import { User } from "../model/User";

export class UserDatabase extends BaseDatabase {

  TABLE_NAME = "";

  public async createUser(
    id: string,
    email: string,
    name: string,
    password: string,
    role: string
  ): Promise<void> {
    try {
     
    } catch (error:any) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  public async getUserByEmail(email: string){
    try {
      
    } catch (error:any) {
      throw new Error(error.sqlMessage || error.message);
    }   
  }
}
