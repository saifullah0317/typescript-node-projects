#! /usr/bin/env node
import inquirer from "inquirer";
var limit = 0, trials = 0;
await inquirer.prompt({
    type: "list",
    name: "limit",
    message: "Select the limit upto which you want the number to lie",
    choices: ["0 to 10", "0 to 100", "0 to 1000"]
}).then((answers) => {
    if (answers.limit == "0 to 10") {
        limit = 10;
        trials = 5;
    }
    else if (answers.limit == "0 to 100") {
        limit = 100;
        trials = 10;
    }
    else if (answers.limit == "0 to 1000") {
        limit = 1000;
        trials = 20;
    }
    console.log("You have " + trials + " number of trials!");
});
const original_num = Math.round(Math.random() * limit);
var index = 0;
function ask_Quest(i) {
    inquirer.prompt({
        type: "number",
        name: "num",
        message: "Enter your guess number: "
    }).then((answers) => {
        if (answers.num == original_num) {
            console.log("You succeed! and your score is " + (trials - i) + " out of " + trials + " points");
            return true;
        }
        else {
            if (i == (trials - 1)) {
                console.log("You loose...!");
                console.log("The original number was " + original_num);
                return false;
            }
            else {
                if (answers.num > original_num) {
                    console.log("Your guess number is greater than the original number!");
                }
                else if (answers.num < original_num) {
                    console.log("Your guess number is less than the original number!");
                }
                i++;
                ask_Quest(i);
            }
        }
    });
}
ask_Quest(index);
