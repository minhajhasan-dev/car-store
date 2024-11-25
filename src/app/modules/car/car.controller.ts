import { Request, Response } from 'express';
import { z } from 'zod';
import { carServices } from './car.service';
import carSchema from './car.zod.validation';

const createCar = async (req: Request, res: Response) => {
  try {
    const carData = carSchema.parse(req.body);

    const result = await carServices.createCarInDB(carData);

    res.status(201).json({
      success: true,
      message: 'Car created successfully',
      data: result,
    });
  } catch (error: unknown) {
    handleError(error, res);
  }
};

// get all cars
const getAllCars = async (req: Request, res: Response) => {
  try {
    const searchTerm = req.query.searchTerm as string;
    const result = await carServices.getAllCarsFromDB(searchTerm);

    if (result.length === 0) {
      res.status(404).json({
        success: false,
        message: 'No cars found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Cars retrieved successfully',
      data: result,
    });
  } catch (error: unknown) {
    handleError(error, res);
  }
};

// get a single car by id
const getSingleCar = async (req: Request, res: Response) => {
  try {
    const {carId} = req.params;
    const result = await carServices.getSingleCarFromDB(carId);

    if (!result || result.length === 0) {
      res.status(404).json({
        success: false,
        message: 'Car not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Car retrieved successfully',
      data: result,
    });
  } catch (error: unknown) {
    handleError(error, res);
  }
};

// update a car by id
const updateCar = async (req: Request, res: Response) => {
  try {
    const {carId} = req.params;
    const result = await carServices.updateCarFromDB(carId);

    if (!result) {
      res.status(404).json({
        success: false,
        message: 'Car not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Car updated successfully',
      data: result,
    });
  } catch (error: unknown) {
    handleError(error, res);
  }
};

// delete a car by id
const deleteCar = async (req: Request, res: Response) => {
  try {
    const {carId} = req.params;
    const result = await carServices.deleteCarFromDB(carId);

    if (!result) {
      res.status(404).json({
        success: false,
        message: 'Car not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Car deleted successfully',
      data: result,
    });
  } catch (error: unknown) {
    handleError(error, res);
  }
};

// handle error here
const handleError = (error: unknown, res: Response) => {
  if (error instanceof z.ZodError) {
    res.status(400).json({
      success: false,
      message: 'Validation error',
      error: error.errors,
    });
  } else {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error,
    });
  }
};

export const CarController = {
  createCar,
  deleteCar,
  getAllCars,
  getSingleCar,
  updateCar,
};