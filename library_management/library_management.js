const prompt = require('prompt-sync')({ sigint: true });
const books = require('./books');

console.log("\nWelcome to the Library Management System!");
let userInput = "";

function displayMenu() {
    console.log("\nThings you can do:");
    console.log("1. Add a new book");
    console.log("2. Display all available books");
    console.log("3. Borrow a book");
    console.log("4. Return a book");
    console.log("5. Find books by author");
    console.log("6. Find books published before a certain year");
    console.log("7. Remove a book");
    console.log("8. Exit");
    console.log();
    userInput = prompt("Type the number of your desired action: ");
    return;
}

function addBook() {
    console.log();
    let newTitle = prompt("What is the title? ");
    let newAuthor = prompt("Who is the author of this book? ");
    let newYear = prompt("What year was this book published? ");
    while (isNaN(newYear) || newYear === "" || newYear >= 2026) {
        newYear = prompt("Please enter a valid year! ");
    }
    newYear = parseInt(newYear);
    let newBook = {
        "title": newTitle,
        "author": newAuthor,
        "year": newYear,
        "isAvailable": true
    };
    books.push(newBook);
    console.log("\n" + newTitle + " has been added to the library!");
    return;
}

function displayBooks() {
    console.log();
    console.log("Books available to borrow: ");
    for (let i = 0; i < books.length; i++) {
        if (books[i].isAvailable) {
            console.log(books[i].title + " by " + books[i].author + ", " + books[i].year);
        }
    }
    return;
}

function borrowBook() {
    console.log();
    let input = prompt("What book do you want to borrow? Enter the title: ");
    for (let i = 0; i < books.length; i++) {
        if (input.toLowerCase() === books[i].title.toLowerCase()) {
            if (books[i].isAvailable) {
                console.log("\nYou have now borrowed " + books[i].title + ".");
                books[i].isAvailable = false;
                return;
            } else {
                console.log("\nSorry, that book is unavailable right now :(");
                return;
            }
        }  
    }
    console.log("\nSorry, we couldn't find that book!");
    return;
}

function returnBook() {
    console.log();
    let input = prompt("Which book are you returning?");
    for (let i = 0; i < books.length; i++) {
        if (input.toLowerCase() === books[i].title.toLowerCase()) {
            if (!books[i].isAvailable) {
                console.log("\nThanks for returning " + books[i].title + "!");
                books[i].isAvailable = true;
                return;
            } else {
                console.log("\nThis book hasn't been borrowed!");
                return;
            }
        }
    }
    console.log("\nSorry, we couldn't find that book!");
    return;
}

function booksByAuthor() {
    console.log();
    let input = prompt("Whose books are you looking for? ");
    for (let i = 0; i < books.length; i++) {
        if (input.toLowerCase() === books[i].author.toLowerCase()) {
            console.log("\nBooks by " + books[i].author + ":");
            for (let j = i; j < books.length; j++) {
                if (input.toLowerCase() === books[j].author.toLowerCase()) {
                    console.log(books[j].title + ", published in " + books[j].year + (books[j].isAvailable ? " (Available)" : " (Not Available)"));
                }
            }
            return;
        }
    }
    console.log("\nSorry, we couldn't find that author.");
    return;
}

function booksByYear() {
    console.log();
    let found = false;
    let input = prompt("You're looking for books published before which year? ");
    while (isNaN(input) || input >= 2026) {
        input = prompt("Please enter a valid year! ");
    }
    console.log("\nBooks published before " + input + " in our library:");
    for (let i = 0; i < books.length; i++) {
        if (books[i].year <= parseInt(input)) {
            found = true;
            console.log(books[i].title + " by " + books[i].author + ", " + books[i].year + (books[i].isAvailable ? " (Available)" : " (Not Available)"));
        }
    }
    if (!found) {
        console.log("We couldn't find any books published before " + input + ".");
    }
    return;
}

function removeBook() {
    console.log();
    let input = prompt("Which book do you want to remove from the library? ");
    for (let i = 0; i < books.length; i++) {
        if (input.toLowerCase() === books[i].title.toLowerCase()) {
            books.splice(i, 1);
            console.log("\n" + input + " has been removed from the library.");
            return;
        }
    }
    console.log("\nWe couldn't find that book!");
    return;
}

while (true) {
    displayMenu();
    switch(userInput) {
        case "1":
            addBook();
            continue;
        case "2":
            displayBooks();
            continue;
        case "3":
            borrowBook();
            continue;
        case "4":
            returnBook();
            continue;
        case "5":
            booksByAuthor();
            continue;
        case "6":
            booksByYear();
            continue;
        case "7":
            removeBook();
            continue;
        case "8":
            process.exit();
            continue;
        default:
            console.log("Please enter a valid number! ");
            continue;
    }
}