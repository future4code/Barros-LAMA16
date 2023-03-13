import { BaseError } from "./BaseError";

export class UserNotFound extends BaseError{
    constructor(){
        super(404, 'Usuario nao localizado')
    }
}
export class BodyNotInserted extends BaseError{
    constructor(){
        super(422, 'o body nao foi totalmente inserido.')
    }
}
