import { PurchaseController } from './../controller/PurchaseController';
import express from 'express';

export const purchaseRouter = express.Router()
const purchaseController = new PurchaseController()

purchaseRouter.post('/purchase/:userId/:showId/:ticketId', purchaseController.ticketPurchase)
purchaseRouter.get('/purchase/show', purchaseController.allTicketsPurchase)