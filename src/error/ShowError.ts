import { BaseError } from "./BaseError";

export class BodyNotInserted extends BaseError{
    constructor(){
        super(422, 'O body não foi totalmente inserido.')
    }
}

export class IdBandNotInserted extends BaseError{
    constructor(){
        super(422, 'O ID da banda não foi inserido.')
    }
}

export class FormatInvalidHour extends BaseError{
    constructor(){
        super(400, 'Formato invalido.. o inicio do show nao pode ser apos o termino do mesmo.')
    }
}

export class FormatInvalidStartTime extends BaseError{
    constructor(){
        super(400, "Horario permitido para iniciar o show e entre 8H as 22H")
    }
}

export class FormatInvalidEndTime extends BaseError{
    constructor(){
        super(400, "Horario permitido para iniciar o show e entre 9H as 23H")
    }
}

export class FormatInvalidTime extends BaseError{
    constructor(){
        super(400, "O show deve somente ser de 1 hora de apresentação.")
    }
}
export class HourNotAvailable extends BaseError{
    constructor(){
        super(400, "Ja existe um show nesta data e horario")
    }
}

export class InvalidDay extends BaseError{
    constructor(){
        super(400, "Dia da semana inválido.")
    }
}

