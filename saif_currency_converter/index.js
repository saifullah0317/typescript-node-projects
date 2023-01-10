#! /usr/bin/env node
import inquirer from "inquirer";
var currencies = {
    "United States Dollar": 1,
    "Pakistani Rupee": 0.0044,
    "Australian Dollar": 0.69,
    "Canadian Dollar": 0.75,
    "Singapore Dollar": 0.75,
    "Newzealand Dollar": 0.64,
    "Indian Rupee": 0.012,
    "Pound sterling": 1.22,
    "Japanese Yen": 0.0076,
    "Chinese Yuan": 0.15,
};
inquirer
    .prompt([
    {
        type: "list",
        name: "from",
        message: "\nSelect currency from which you want to convert:",
        choices: Object.keys(currencies),
    },
    {
        type: "list",
        name: "to",
        message: "\nSelect currency to which you want to convert:",
        choices: Object.keys(currencies),
    },
    {
        type: "number",
        name: "amount",
        message: "\nEnter how much you want to convert: ",
    },
])
    .then((answers) => {
    let converted = (1 / currencies[answers.to]) *
        currencies[answers.from] *
        answers.amount;
    console.log(answers.amount +
        " " +
        answers.from +
        " equals " +
        converted +
        " " +
        answers.to);
});
