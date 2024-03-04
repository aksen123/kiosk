export interface Food {
  id: string;
  name: string;
  price: number;
  src: string;
  number: number;
  count: number;
  soldOut: boolean;
}

export interface Order {
  date: number;
  order: string;
}
export interface OrderList {
  name: string;
  price: number;
  count: number;
}
