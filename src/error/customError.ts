import { BaseError } from "./BaseError";

export class UserNotFound extends BaseError{
    constructor(){
        super(404, 'Usuario não localizado')
    }
}
export class BandNotFound extends BaseError{
    constructor(){
        super(404, 'Banda não localizada')
    }
}
export class ShowNotFound extends BaseError{
    constructor(){
        super(404, 'Show não localizado')
    }
}
export class TicketNotFound extends BaseError{
    constructor(){
        super(404, 'Ingresso não localizado')
    }
}

export class TokenNotInserted extends BaseError{
    constructor(){
        super(422, 'Token não foi inserido.')
    }
}

export class NotAuthorized extends BaseError{
    constructor(){
        super(404, 'Não Autorizado.')
    }
}

export class NotAuthorizedAdmin extends BaseError{
    constructor(){
        super(404, 'Somente usuários ADMIN estão permitidos para realizar esta ação.')
    }
}

export class BodyNotInserted extends BaseError{
    constructor(){
        super(422, 'O body não foi totalmente inserido.')
    }
}

export class BandExist extends BaseError{
    constructor(){
        super(400, 'Ja existe uma banda registrada com este nome.')
    }
}


