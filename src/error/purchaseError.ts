import { BaseError } from "./BaseError";

export class QtdNotInserted extends BaseError{
    constructor(){
        super(422, 'Quantidade nao foi inserida')
    }
}

export class QtdFormat extends BaseError{
    constructor(){
        super(404, 'Deve ser sem formato de numeros inteiros.')
    }
}