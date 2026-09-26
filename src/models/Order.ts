import { CartItem } from "./CartItem";

export type OrderStatus =
    | "Placed"
    | "Preparing"
    | "Ready"
    | "Completed"
    | "Cancelled";

export interface Order {
    id: number;
    items: CartItem[];
    subtotal: number;
    gst: number;
    total: number;
    status: OrderStatus;
}