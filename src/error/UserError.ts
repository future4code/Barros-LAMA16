import { BaseError } from "./BaseError";

export class UserNotFound extends BaseError{
    constructor(){
        super(404, 'Usuario não localizado')
    }
}

export class EmailExist extends BaseError{
    constructor(){
        super(400, 'Já existe um usuário cadastrado com este endereço de email.')
    }
}

export class EmailFormat extends BaseError{
    constructor(){
        super(400, 'Formato inválido de email.')
    }
}

export class PasswordWrong extends BaseError{
    constructor(){
        super(404, 'Senha incorreta.')
    }
}