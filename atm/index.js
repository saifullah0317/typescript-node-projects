#! /usr/bin/env node
import inquirer from "inquirer";
var users = [];
class User {
    name;
    id;
    pin;
    cnic;
    amount;
    constructor(name, id, pin, cnic, amount) {
        this.amount = amount;
        this.cnic = cnic;
        this.id = id;
        this.name = name;
        this.pin = pin;
    }
    withdraw(amount) {
        if (amount > this.amount) {
            console.log("Cannot withdraw amount...!\nYou have only " + this.amount + " pkr in your account!");
        }
        else {
            this.amount = this.amount - amount;
            console.log("Amount successfully withdrew!\nNow your current amount is: " + this.amount + " pkr only.");
        }
    }
    deposit(amount) {
        this.amount += amount;
        console.log("Amount successfully deposited!\nNow your current amount is: " + this.amount + " pkr only.");
    }
}
let u1 = new User("SaifUllah", "saifullah999", 3520, "35201-3954439-9", 10000);
let u2 = new User("Ali", "ali123", 1234, "35201-1234567-8", 5000);
users.push(u1);
users.push(u2);
async function userMenu(index) {
    await inquirer.prompt({
        type: "list",
        name: "menu",
        message: "\nSelect an option from the menu:",
        choices: ["View amount", "Withdraw amount", "Deposit amount"]
    }).then(async (answers) => {
        if (answers.menu === "View amount") {
            console.log("Current amount in your account is: " + users[index].amount + " pkr only.");
        }
        else if (answers.menu === "Withdraw amount") {
            await inquirer.prompt({
                type: "number",
                name: "amount",
                message: "Enter how much amount you want to withdraw: "
            }).then(async (answer) => {
                await users[index].withdraw(answer.amount);
            });
        }
        else if (answers.menu === "Deposit amount") {
            await inquirer.prompt({
                type: "number",
                name: "amount",
                message: "Enter how much amount you want to deposit: "
            }).then(async (answer) => {
                await users[index].deposit(answer.amount);
            });
        }
    });
    await userMenu(index);
}
await inquirer.prompt([
    {
        type: "input",
        name: "id",
        message: "Enter user id: "
    },
    {
        type: "number",
        name: "pin",
        message: "Enter user pin: "
    }
]).then(async (answers) => {
    let flag = false;
    for (let i = 0; i < users.length; i++) {
        if (users[i].id === answers.id && users[i].pin === answers.pin) {
            flag = true;
            await userMenu(i);
        }
    }
    if (!flag) {
        console.log("Invalid credentials...!");
    }
});
