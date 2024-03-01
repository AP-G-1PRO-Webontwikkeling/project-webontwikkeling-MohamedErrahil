import * as readline from 'readline-sync';
import {Car} from './interfaces/Car'

const DATA_URL: string = "https://raw.githubusercontent.com/MohamedErrahil/server/main/cars.json";
const MENU_OPTIONS: string[] = ["View all data", "Filter by ID", "Exit"];

let isApplicationStopped: boolean = false;

async function main() {
    while (!isApplicationStopped) {
        console.log("Welcome to the JSON data viewer!\n");

        for (let i = 0; i < MENU_OPTIONS.length; i++) {
            console.log(`${i + 1}. ${MENU_OPTIONS[i]}`);
        }

        console.log("\n");
        const userChoice: number = readline.questionInt("Please enter your choice: ");

        if (userChoice === 1) {
            await displayAllData();
        } else if (userChoice === 2) {
            await filterDataById();
        } else if (userChoice === 3) {
            stopApplication();
        } else {
            console.log("Invalid choice. Please try again.\n");
        }
    }
}

async function displayAllData() {
    try {
        const response = await fetch(DATA_URL);
        const data = await response.json();
        displayData(data as Car[]); // Gebruik de Car-interface hier
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

function displayData(items: Car[]) {
    console.log("\n");
    for (let i = 0; i < items.length; i++) {
        console.log(`- ${items[i].brand} ${items[i].model} (${items[i].id})`);
    }
    readline.question("Press enter");
}

async function filterDataById() {
    const id: number = readline.questionInt("Please enter the ID you want to filter by: ");
    try {
        const response = await fetch(DATA_URL);
        const data = await response.json();
        const item = data.find((item: Car) => item.id === id);
        if (item) {
            showFilteredData(item);
        } else {
            console.log("Item not found.\n");
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
    readline.question("Press enter");
}

function stopApplication() {
    console.log("Goodbye!");
    isApplicationStopped = true;
}

function showFilteredData(item: Car) {
    console.log(`- ${item.brand} ${item.model} (${item.id})`);
    console.log(`  - Year: ${item.year}`);
    console.log(`  - Color: ${item.color}`);
    console.log(`  - Automatic: ${item.isAutomatic}`);
    console.log(`  - Manufacturing Date: ${item.manufacturingDate}`);
    console.log(`  - Fuel Type: ${item.fuelType}`);
    console.log(`  - Features: ${item.features.join(', ')}`);
    console.log(`  - Owner:`);
    console.log(`    - ID: ${item.owner.id}`);
    console.log(`    - Name: ${item.owner.name}`);
    console.log(`    - Age: ${item.owner.age}`);
    console.log(`    - Image: ${item.owner.image}`);
}

main();