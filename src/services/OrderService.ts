import { Order, OrderStatus } from "../models/Order";
import { CartItem } from "../models/CartItem";

export class OrderService {

    private orders: Order[] = [];

    private nextOrderId: number = 1001;

    createOrder(
        cartItems: CartItem[],
        subtotal: number,
        gst: number,
        total: number
    ): Order {

        const order: Order = {
            id: this.nextOrderId++,
            items: cartItems.map(item => ({
                item: item.item,
                quantity: item.quantity
            })),
            subtotal,
            gst,
            total,
            status: "Placed"
        };

        this.orders.push(order);

        return order;
    }

    getOrders(): Order[] {
        return this.orders;
    }

    getOrderById(id: number): Order | undefined {

        return this.orders.find(
            order => order.id === id
        );
    }

    cancelOrder(id: number): boolean {

        const order = this.getOrderById(id);

        if (!order) {
            return false;
        }

        if (order.status === "Completed") {

            console.log(
                "Completed order cannot be cancelled."
            );

            return false;
        }

        if (order.status === "Cancelled") {

            console.log(
                "Order is already cancelled."
            );

            return false;
        }

        order.status = "Cancelled";

        return true;
    }

    updateOrderStatus(
        id: number,
        status: OrderStatus
    ): boolean {

        const order = this.getOrderById(id);

        if (!order) {
            return false;
        }

        order.status = status;

        return true;
    }

    displayOrders(): void {

        if (this.orders.length === 0) {

            console.log("\nNo orders found.\n");

            return;
        }

        console.log("\n========== ORDERS ==========\n");

        for (const order of this.orders) {

            console.log(`Order ID: ${order.id}`);
            console.log(`Status: ${order.status}`);
            console.log(`Total: ₹${order.total}`);

            console.log("Items:");

            for (const cartItem of order.items) {

                console.log(
                    `  ${cartItem.item.name} x ${cartItem.quantity}`
                );
            }

            console.log("--------------------------------");
        }
    }
}