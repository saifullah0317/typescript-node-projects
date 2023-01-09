#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";
import chalkAnimation from "chalk-animation";
import { type } from "os";
import ListPrompt from "inquirer/lib/prompts/list.js";
import { listenerCount } from "process";

function rainbow1() {
  const rainbow = chalkAnimation.rainbow("Lets start calculation!"); // Animation starts
//   setTimeout(() => {
//     rainbow.start(); // Animation resumes
//   }, 0);
  setTimeout(() => {
    rainbow.stop(); // Animation stops
  }, 2000);
}
function sleep(){
    return new Promise((res)=>{
        setTimeout(res,2000)
    })
}

async function showCalcul() {
  await rainbow1();
  await sleep();
  console.log(`     _____________________
    |  _________________  |
    | |                 | |
    | |_________________| |
    |  ___ ___ ___   ___  |
    | | 7 | 8 | 9 | | + | |
    | |___|___|___| |___| |
    | | 4 | 5 | 6 | | - | |
    | |___|___|___| |___| |
    | | 1 | 2 | 3 | | x | |
    | |___|___|___| |___| |
    | | . | 0 | = | | / | |
    | |___|___|___| |___| |
    |_____________________|
    `);
    await inquirer
      .prompt([
        /* Pass your questions in here */
        {
          type: "list",
          name: "operator",
          message: "Selection operation you want to perform:",
          choices: ["addition", "subtraction", "multiplication", "division"],
        },
        {
          type: "number",
          name: "num1",
          message: "Enter number1: ",
        },
        {
          type: "number",
          name: "num2",
          message: "Enter number2: ",
        },
      ])
      .then((answers) => {
        // Use user feedback for... whatever!!
        if (answers.operator == "addition") {
          console.log(
            answers.num1 +
              " + " +
              answers.num2 +
              " = " +
              (answers.num1 + answers.num2)
          );
        } else if (answers.operator == "subtraction") {
          console.log(
            answers.num1 +
              " - " +
              answers.num2 +
              " = " +
              (answers.num1 - answers.num2)
          );
        } else if (answers.operator == "multiplication") {
          console.log(
            answers.num1 +
              " x " +
              answers.num2 +
              " = " +
              answers.num1 * answers.num2
          );
        } else {
          console.log(
            answers.num1 +
              " / " +
              answers.num2 +
              " = " +
              answers.num1 / answers.num2
          );
        }
      });
}
async function repeat(){
    var ans;
    do{
        await showCalcul();
        await inquirer.prompt([
            {
                type:"input",
                name:"status",
                message:"Press y if you want to calculate again, otherwise anyother key: "
            }
        ])
        .then((answers)=>{
            ans=answers.status;
        })
    }while(ans=="y" || ans=="Y")
}
repeat();