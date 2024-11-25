import mongoose, { model, Schema } from 'mongoose';
import { Order } from './order/order.interface';
import {CarModel} from './car.model';

const OrderSchema = new Schema<Order>(
  {
    email: {
      type: String,
      required: true,
    },
    car: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Car',
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

OrderSchema.pre('save', async function (next) {
  if (!this.totalPrice) {
    const car = await CarModel.findById(this.car);
    if (car) {
      this.totalPrice = car.price * this.quantity;
    }
  }
  next();
});

export const Orders = model<Order>('Order', OrderSchema);