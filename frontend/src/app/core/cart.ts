import { Product } from "./product";

export interface Cart {
  items: CartItem[];
  totalAmount: number;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
}