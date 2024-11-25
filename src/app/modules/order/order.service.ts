import { Orders } from '../order.model';
import { Order } from './order.interface';

const createOrderIntoDB = async (orderData: Order) => {
  const result = await Orders.create(orderData);
  return result;
};

export const OrderServices = {
  createOrderIntoDB,
};
