import { Request, Response } from 'express';
import { Orders } from '../order.model';

const calculateTotalRevenue = async (req: Request, res: Response) => {
  try {
    const revenueResult = await Orders.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: '$totalPrice' },
        },
      },
    ]);

    const totalRevenue = revenueResult.length ? revenueResult[0].totalRevenue : 0;

    res.status(200).json({
      status: true,
      message: 'Revenue calculated successfully',
      data: { totalRevenue },
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: 'Failed to calculate revenue',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const RevenueControllers = {
  calculateTotalRevenue,
};