#! /usr/bin/env node
import inquirer from "inquirer";

inquirer.prompt({
    type:"input",
    name:"para",
    message:"Enter paragrapgh: "
}).then((answers)=>{
    let words=answers.para.split(" ");
    console.log("Number of words are: "+words.length);
    let characters=0;
    for(let i=0;i<words.length;i++)
    {
        characters+=words[i].length;
    }
    console.log("And number of characters excluding white spaces are: "+characters);
})