import express from 'express';
import { OrderControllers } from './order.controller';
import { RevenueControllers } from './revenue.controller';

const router = express.Router();

router.post('/', OrderControllers.createOrder);
router.get('/revenue', RevenueControllers.calculateTotalRevenue);

export const OrderRoutes = router;
