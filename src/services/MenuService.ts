import { MenuItem } from "../models/MenuItem";

export class MenuService {

    private menu: MenuItem[] = [
        {
            id: 1,
            name: "Burger",
            price: 120,
            category: "Fast Food",
            available: true
        },
        {
            id: 2,
            name: "Pizza",
            price: 250,
            category: "Fast Food",
            available: true
        },
        {
            id: 3,
            name: "Pasta",
            price: 180,
            category: "Italian",
            available: true
        },
        {
            id: 4,
            name: "Sandwich",
            price: 100,
            category: "Snacks",
            available: true
        },
        {
            id: 5,
            name: "Coffee",
            price: 80,
            category: "Beverages",
            available: true
        },
        {
            id: 6,
            name: "Momos",
            price: 150,
            category: "Snacks",
            available: true
        }
    ];

    getAllItems(): MenuItem[] {
        return this.menu;
    }

    getItemById(id: number): MenuItem | undefined {
        return this.menu.find(item => item.id === id);
    }

    searchItem(keyword: string): MenuItem[] {
        return this.menu.filter(item =>
            item.name.toLowerCase().includes(keyword.toLowerCase())
        );
    }

    displayMenu(): void {

        console.log("\n========== MENU ==========\n");

        console.log(
            "ID\tItem\t\tPrice\tCategory\tAvailable"
        );

        console.log("-----------------------------------------------");

        for (const item of this.menu) {

            console.log(
                `${item.id}\t${item.name.padEnd(12)}\t₹${item.price}\t${item.category}\t${item.available ? "Yes" : "No"}`
            );
        }

        console.log();
    }
}