import { CartItem } from "../models/CartItem";
import { MenuItem } from "../models/MenuItem";

export class CartService {

    private cart: CartItem[] = [];

    addItem(item: MenuItem, quantity: number): void {

        if (quantity <= 0) {
            console.log("Quantity must be greater than 0.");
            return;
        }

        const existingItem = this.cart.find(
            cartItem => cartItem.item.id === item.id
        );

        if (existingItem) {

            existingItem.quantity += quantity;

        } else {

            this.cart.push({
                item,
                quantity
            });
        }

        console.log(
            `${quantity} x ${item.name} added to cart.`
        );
    }

    removeItem(itemId: number): boolean {

        const index = this.cart.findIndex(
            cartItem => cartItem.item.id === itemId
        );

        if (index === -1) {
            return false;
        }

        const removedItem = this.cart[index];

if (!removedItem) {
    return false;
}

this.cart.splice(index, 1);

console.log(
    `${removedItem.item.name} removed from cart.`
);

        return true;
    }

    getCart(): CartItem[] {
        return this.cart;
    }

    isEmpty(): boolean {
        return this.cart.length === 0;
    }

    calculateSubtotal(): number {

        let total = 0;

        for (const cartItem of this.cart) {

            total +=
                cartItem.item.price *
                cartItem.quantity;
        }

        return total;
    }

    clearCart(): void {
        this.cart = [];
    }

    displayCart(): void {

        if (this.isEmpty()) {
            console.log("\nCart is empty.\n");
            return;
        }

        console.log("\n========== CART ==========\n");

        console.log(
            "ID\tItem\t\tQty\tPrice"
        );

        console.log("------------------------------------");

        for (const cartItem of this.cart) {

            const total =
                cartItem.item.price *
                cartItem.quantity;

            console.log(
                `${cartItem.item.id}\t${cartItem.item.name.padEnd(12)}\t${cartItem.quantity}\t₹${total}`
            );
        }

        console.log("------------------------------------");

        console.log(
            `Subtotal: ₹${this.calculateSubtotal()}`
        );

        console.log();
    }
}