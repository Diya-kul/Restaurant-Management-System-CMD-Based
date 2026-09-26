"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MenuService_1 = require("./services/MenuService");
const CartService_1 = require("./services/CartService");
const OrderService_1 = require("./services/OrderService");
const input_1 = require("./utils/input");
const bill_1 = require("./utils/bill");
// Create service objects
const menuService = new MenuService_1.MenuService();
const cartService = new CartService_1.CartService();
const orderService = new OrderService_1.OrderService();
// Main menu
function displayMainMenu() {
    console.log(`
========================================
       RESTAURANT MANAGEMENT SYSTEM
========================================

1. View Menu
2. Search Food
3. Add Food to Cart
4. View Cart
5. Remove Food from Cart
6. Place Order
7. View Orders
8. Cancel Order
9. Generate Bill
10. Exit

========================================
`);
}
// View Menu
async function viewMenu() {
    menuService.displayMenu();
}
// Search Food
async function searchFood() {
    const keyword = await (0, input_1.askQuestion)("Enter food name to search: ");
    const results = menuService.searchItem(keyword);
    if (results.length === 0) {
        console.log("\nNo food item found.\n");
        return;
    }
    console.log("\n========== SEARCH RESULTS ==========\n");
    for (const item of results) {
        console.log(`${item.id}. ${item.name} - ₹${item.price}`);
    }
    console.log();
}
// Add Food
async function addFoodToCart() {
    menuService.displayMenu();
    const idInput = await (0, input_1.askQuestion)("Enter food ID: ");
    const id = Number(idInput);
    if (Number.isNaN(id)) {
        console.log("Please enter a valid number.");
        return;
    }
    const item = menuService.getItemById(id);
    if (!item) {
        console.log("Food item not found.");
        return;
    }
    if (!item.available) {
        console.log("This item is currently unavailable.");
        return;
    }
    const quantityInput = await (0, input_1.askQuestion)("Enter quantity: ");
    const quantity = Number(quantityInput);
    if (Number.isNaN(quantity) ||
        quantity <= 0 ||
        !Number.isInteger(quantity)) {
        console.log("Please enter a valid positive quantity.");
        return;
    }
    cartService.addItem(item, quantity);
}
// View Cart
async function viewCart() {
    cartService.displayCart();
}
// Remove Food
async function removeFoodFromCart() {
    cartService.displayCart();
    if (cartService.isEmpty()) {
        return;
    }
    const idInput = await (0, input_1.askQuestion)("Enter food ID to remove: ");
    const id = Number(idInput);
    if (Number.isNaN(id)) {
        console.log("Invalid ID.");
        return;
    }
    const removed = cartService.removeItem(id);
    if (!removed) {
        console.log("Food item was not found in your cart.");
    }
}
// Place Order
async function placeOrder() {
    if (cartService.isEmpty()) {
        console.log("\nYour cart is empty. Add some food first.\n");
        return;
    }
    cartService.displayCart();
    const confirmation = await (0, input_1.askQuestion)("Place this order? (yes/no): ");
    if (confirmation.toLowerCase() !== "yes") {
        console.log("Order cancelled by user.");
        return;
    }
    const subtotal = cartService.calculateSubtotal();
    const gst = subtotal * 0.05;
    const total = subtotal + gst;
    const order = orderService.createOrder(cartService.getCart(), subtotal, gst, total);
    console.log(`\nOrder placed successfully! Order ID: ${order.id}`);
    cartService.clearCart();
    (0, bill_1.generateBill)(order);
}
// View Orders
async function viewOrders() {
    orderService.displayOrders();
}
// Cancel Order
async function cancelOrder() {
    const idInput = await (0, input_1.askQuestion)("Enter Order ID: ");
    const id = Number(idInput);
    if (Number.isNaN(id)) {
        console.log("Invalid Order ID.");
        return;
    }
    const cancelled = orderService.cancelOrder(id);
    if (cancelled) {
        console.log(`Order ${id} cancelled successfully.`);
    }
    else {
        console.log("Order could not be cancelled.");
    }
}
// Generate Bill
async function printBill() {
    const idInput = await (0, input_1.askQuestion)("Enter Order ID: ");
    const id = Number(idInput);
    if (Number.isNaN(id)) {
        console.log("Invalid Order ID.");
        return;
    }
    const order = orderService.getOrderById(id);
    if (!order) {
        console.log("Order not found.");
        return;
    }
    (0, bill_1.generateBill)(order);
}
// Main Application
async function startApplication() {
    let running = true;
    console.log("\nWelcome to Restaurant Management System!");
    while (running) {
        displayMainMenu();
        const choice = await (0, input_1.askQuestion)("Enter your choice: ");
        switch (choice) {
            case "1":
                await viewMenu();
                break;
            case "2":
                await searchFood();
                break;
            case "3":
                await addFoodToCart();
                break;
            case "4":
                await viewCart();
                break;
            case "5":
                await removeFoodFromCart();
                break;
            case "6":
                await placeOrder();
                break;
            case "7":
                await viewOrders();
                break;
            case "8":
                await cancelOrder();
                break;
            case "9":
                await printBill();
                break;
            case "10":
                running = false;
                console.log("\nThank you for visiting. Goodbye!\n");
                break;
            default:
                console.log("\nInvalid choice. Please select 1-10.\n");
        }
    }
    (0, input_1.closeInput)();
}
// Start application
startApplication();
