const prompt = require('prompt-sync')();
console.log();

let budget = parseFloat(prompt("What is your budget for this month? "));
let totalExpenses = 0;
let expenses = [];

function displayMenu() {
    console.log("\nThings you can do:");
    console.log("1. Add a new expense");
    console.log("2. View total expenses");
    console.log("3. Remove an expense");
    console.log("4. Exit");
    console.log();
    return;
}

function addExpense() {
    let newAmount = prompt("How much is the expense? ");
    while (isNaN(newAmount) || newAmount <= 0) {
        newAmount = prompt("Please enter a real amount! ");
    }
    let newExpense = {};
    newExpense.amount = parseFloat(newAmount);
    newExpense.category = prompt("What category is the expense? ");
    expenses.push(newExpense);
    totalExpenses += newExpense.amount;
    console.log("\nExpense added to " + newExpense.category + "!");
    return;
}

function viewTotalExpenses() {
    console.log("\nTotal expenses so far: " + totalExpenses + "/" + budget);
    return;
}

function removeExpense() {
    let removeCat = prompt("Which category do you want to remove from? ");
    for (let i in expenses) {
        if (removeCat == expenses[i].category) {
            totalExpenses -= expenses[i].amount;
            expenses.pop(i);
            console.log("\nExpense removed from " + removeCat + "!");
            return;
        }
    }
    console.log("\nNo expenses found in that category.");
    return;
}

while(true) {
    if (totalExpenses == budget) {
        console.log("You have reached your budget!");
    } else if (totalExpenses > budget) {
        console.log("You have spent more money than your budget!");
    }
    displayMenu();
    let choice = prompt("Type the number of your action: ");
    switch(choice) {
        case "1":
            addExpense();
            continue;
        case "2":
            viewTotalExpenses();
            continue;
        case "3":
            removeExpense();
            continue;
        case "4":
            process.exit();
            continue;
        default:
            console.log("Invalid choice, please try again.");
    }
}