import { BaseError } from "./BaseError";

export class QtdFormat extends BaseError{
    constructor(){
        super(404, 'Deve ser sem formato de numeros inteiros.')
    }
}

export class NameNotInserted extends BaseError{
    constructor(){
        super(422, "Informe o nome do ingresso.")
    }
}

export class ValueTicketNotInserted extends BaseError{
    constructor(){
        super(422, "Informe o valor do ingresso.")
    }
}

export class QtdTicket extends BaseError{
    constructor(){
        super(422, "Informe a quantidade disponivel")
    }
}