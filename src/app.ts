import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { CarRoutes } from './app/modules/car/car.route';
import { OrderRoutes } from './app/modules/order/order.route';

const app: Application = express();

// parser middleware
app.use(express.json());
app.use(cors());

// application routes here
app.use('/api/cars', CarRoutes);
app.use('/api/orders', OrderRoutes);

// root route
app.get('/', (req: Request, res: Response) => {
  res.json('Welcome to the Car Store API');
});

export default app;
