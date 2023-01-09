#! /usr/bin/env node
import inquirer from "inquirer";
var todos = [];
async function showMenu() {
    await inquirer.prompt({
        type: "list",
        name: "menu",
        message: "\nSelect option: ",
        choices: ["Add task", "View list", "Remove task"]
    }).then(async (answers) => {
        if (answers.menu === "Add task") {
            await inquirer.prompt({
                type: "input",
                name: "task",
                message: "Enter task: "
            }).then((answer) => {
                todos.push(answer.task);
                console.log("Task successfully added to the list!");
            });
        }
        else if (answers.menu === "View list") {
            console.log("\n...Todos List...");
            for (let i = 0; i < todos.length; i++) {
                console.log(todos[i]);
            }
            console.log("\n...Finish...");
        }
        else if (answers.menu === "Remove task") {
            await inquirer.prompt({
                type: "list",
                name: "task",
                message: "Select task to remove: ",
                choices: todos
            }).then((answer) => {
                for (let i = 0; i < todos.length; i++) {
                    if (answer.task === todos[i]) {
                        todos.splice(i, 1);
                        console.log("Task removed successfully!");
                        break;
                    }
                }
            });
        }
    });
    await showMenu();
}
await showMenu();
