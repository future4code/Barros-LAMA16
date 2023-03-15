import { TicketController } from './../controller/TicketController';
import  express  from 'express';

export const ticketRouter = express.Router()
const ticketController = new TicketController()

ticketRouter.post('/create/:showId', ticketController.createTicket)
ticketRouter.delete('/delete/:id', ticketController.deleteTicket)
ticketRouter.get('/showTickets', ticketController.getAllTicket)