export interface Food {
  id: string;
  name: string;
  price: number;
  src: string;
  sort: number;
  count: number;
  soldOut: boolean;
  hide: boolean;
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
