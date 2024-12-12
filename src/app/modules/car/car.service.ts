import mongoose from 'mongoose';
import { CarModel } from '../car.model';
import { Car } from './car.interface';

const createCarInDB = async (car: Car) => {
  const result = await CarModel.create(car);
  return result;
};

// get all cars
const getAllCarsFromDB = async (searchTerm?: string) => {
  const filter: Record<string, unknown> = {};
  if (searchTerm) {
    filter.$or = [
      { brand: { $regex: searchTerm, $options: 'i' } },
      { model: { $regex: searchTerm, $options: 'i' } },
      { category: { $regex: searchTerm, $options: 'i' } },
    ];
  }
  const result = await CarModel.find(filter);
  return result;
};

// get a single car by id
const getSingleCarFromDB = async (id: string) => {
  const result = await CarModel.aggregate([
    { $match: { _id: new mongoose.Types.ObjectId(id) } },
  ]);
  return result;
};

// update a car by id
const updateCarFromDB = async (id: string, updateData: { price: number; quantity: number }) => {
  const result = await CarModel.findOneAndUpdate(
    { _id: new mongoose.Types.ObjectId(id) },
    { price: updateData.price, quantity: updateData.quantity },
    { new: true, runValidators: true },
  );
  return result;
};

// delete a car by id
const deleteCarFromDB = async (id: string) => {
  const result = await CarModel.findOneAndDelete(
    { _id: new mongoose.Types.ObjectId(id) },
    { isDeleted: true },
  );
  return result;
};

export const carServices = {
  createCarInDB,
  getAllCarsFromDB,
  getSingleCarFromDB,
  updateCarFromDB,
  deleteCarFromDB,
};
