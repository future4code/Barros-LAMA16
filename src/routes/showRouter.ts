import  express  from 'express';
import { ShowController } from '../controller/ShowsController';

export const showRouter = express.Router()

const showsController = new ShowController()

showRouter.post('/register/:id', showsController.registerShow)
showRouter.get('/allShows', showsController.getAllShows)
showRouter.get('/showsByDay/:day', showsController.getAllShowsByDay)