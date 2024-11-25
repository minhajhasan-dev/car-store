import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { OrderServices } from './order.service';
import OrderSchema from './order.zod.validation';
import { z } from 'zod';
import { InventoryService } from './inventory.service';

const createOrder = async (req: Request, res: Response) => {
  try {
    const orderData = req.body;
    const parsedData = OrderSchema.parse(orderData);

    const carId = new mongoose.Types.ObjectId(parsedData.car);
    await InventoryService.updateInventory(carId.toString(), parsedData.quantity);

    const newOrder = await OrderServices.createOrderIntoDB({
      ...parsedData,
      car: carId,
    });

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      data: newOrder,
    });
  } catch (error) {
    handleErrorResponse(error, res);
  }
};

const handleErrorResponse = (error: unknown, res: Response) => {
  if (error instanceof z.ZodError) {
    const errors = error.errors.reduce((acc: Record<string, unknown>, err) => {
      const path = err.path.join('.') || 'unknown';
      acc[path] = {
        message: err.message,
        name: 'ValidationError',
        properties: {
          message: err.message,
          type: err.code,
        },
        kind: err.code,
        path: path,
      };
      return acc;
    }, {});

    res.status(400).json({
      success: false,
      message: 'Validation error',
      error: {
        name: 'ValidationError',
        errors: errors,
      },
      stack: new Error().stack,
    });
  } else {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

export const OrderControllers = {
  createOrder,
};