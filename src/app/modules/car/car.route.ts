import express from 'express';
import { CarController } from './car.controller';

const router = express.Router();

// car controller routes
router.post('/', CarController.createCar);
router.get('/', CarController.getAllCars);
router.get('/:carId', CarController.getSingleCar);
router.put('/:carId', CarController.updateCar);
router.delete('/:carId', CarController.deleteCar);

export const CarRoutes = router;