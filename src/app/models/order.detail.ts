import { Product } from "./product";
import {Order} from './order'

export interface OrderDetail {
    id: number;
    order: Order;
    product: Product;
    price: number;
    numberOfProduct : number;
    totalMoney: number;
}