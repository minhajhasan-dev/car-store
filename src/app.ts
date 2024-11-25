import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { CarRoutes } from './app/modules/car/car.route';

const app: Application = express();

// parser middleware
app.use(express.json());
app.use(cors());

// root route
app.get('/', (req: Request, res: Response) => {
  res.json('Welcome to the Car Store API');
});

// application routes here
app.use('/api/cars', CarRoutes);

export default app;
