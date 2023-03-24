import  express  from 'express';
import { BandsController } from '../controller/BandsController';

export const bandsRouter = express.Router();

const bandsController = new BandsController

bandsRouter.post('/register',bandsController.register)
bandsRouter.get('/band/:id',bandsController.getBandById)
bandsRouter.get('/allBands/',bandsController.getAllBands)