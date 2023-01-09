#! /usr/bin/env node
import inquirer from "inquirer";
function timer(count) {
    console.log("\n...START...");
    let interval = setInterval(() => {
        console.log(count);
        count--;
        if (count < 0) {
            clearInterval(interval);
            console.log("...STOP...");
        }
    }, 1000);
}
var date = new Date();
console.log("The date is: " + date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear() + "\nAnd the time: " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds());
inquirer.prompt({
    type: "number",
    name: "count",
    message: "Enter from how many seconds you want to start the timer: "
}).then((answers) => {
    timer(answers.count);
});
