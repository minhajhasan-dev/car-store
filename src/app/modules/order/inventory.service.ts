import {CarModel} from '../car.model';

const updateInventory = async (carId: string, orderedQuantity: number) => {
  const car = await CarModel.findById(carId);
  if (!car) {
    throw new Error('Car not found');
  }

  // Check if there is sufficient stock
  if (car.quantity < orderedQuantity) {
    throw new Error('Insufficient stock available');
  }

  car.quantity -= orderedQuantity;
  car.isStock = car.quantity > 0;

  await car.save();
};

export const InventoryService = {
  updateInventory,
};