import { Order } from "../models/Order";

export function generateBill(order: Order): void {

    console.log("\n");
    console.log("================================");
    console.log("             BILL");
    console.log("================================");

    console.log(`Order ID: ${order.id}`);
    console.log(`Status: ${order.status}`);

    console.log("--------------------------------");

    for (const cartItem of order.items) {

        const itemTotal =
            cartItem.item.price *
            cartItem.quantity;

        console.log(
            `${cartItem.item.name} x ${cartItem.quantity} = ₹${itemTotal}`
        );
    }

    console.log("--------------------------------");

    console.log(
        `Subtotal: ₹${order.subtotal.toFixed(2)}`
    );

    console.log(
        `GST (5%): ₹${order.gst.toFixed(2)}`
    );

    console.log("--------------------------------");

    console.log(
        `TOTAL: ₹${order.total.toFixed(2)}`
    );

    console.log("================================");
    console.log("        Thank You!");
    console.log("================================\n");
}