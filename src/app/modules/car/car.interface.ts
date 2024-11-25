export type Car = {
  brand: string;
  model: string;
  year: number;
  price: number;
  category: 'Sedan' | 'SUV' | 'Truck' | 'Coupe' | 'Convertible';
  description: string;
  quantity: number;
  isStock: boolean;
  createdAt?: Date;
  isDeleted: boolean;
  updatedAt?: Date;
};
