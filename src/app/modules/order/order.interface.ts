import mongoose from 'mongoose';

export type Order = {
  email: string;
  car: mongoose.Types.ObjectId;
  quantity: number;
  totalPrice: number;
  createdAt?: Date;
  updatedAt?: Date;
};
