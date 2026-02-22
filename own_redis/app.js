import fs from "node:fs";
import prompt from "prompt-sync";

const input = prompt();

let raw_data = fs.readFileSync("./backup.txt", "utf-8");
let db_data = {};

if (raw_data !== "") {
  db_data = JSON.parse(raw_data);
}

console.log("Welcome to own Redis");
console.log("Available commands are: set, get, delete, getAll, exit");

while (true) {
  let data = input();
  let temp = data.split(" ");
  if (temp[0].toLowerCase() === "set") {
    if (temp.length < 3) {
      console.log("Too few arguments");
      console.log("Format is: set name debottam");
    } else if (temp.length > 3) {
      console.log("Too many arguments");
      console.log("Foramt is: set name debottam");
    } else {
      db_data[temp[1]] = temp[2];
    }
  } else if (temp[0].toLowerCase() === "get") {
    if (temp.length < 2) {
      console.log("Too few arguments");
      console.log("Format is: get name");
    } else if (temp.length > 2) {
      console.log("Too many arguments");
      console.log("Format is: get name");
    } else {
      console.log(db_data[temp[1]]);
    }
  } else if (temp[0].toLowerCase() === "delete") {
    if (temp.length < 2) {
      console.log("Too few arguments");
      console.log("Format is: delete key");
    } else if (temp.length > 2) {
      console.log("Too many arguments");
      console.log("Format is: delete key");
    } else {
      delete db_data[temp[1]];
    }
  } else if (temp[0].toLowerCase() === "getall") {
    if (temp.length > 1) {
      console.log("Too many arguments");
      console.log("Format is: getAll");
    } else {
      console.log(db_data);
    }
  } else if (temp[0].toLowerCase() === "exit") {
    fs.writeFileSync("./backup.txt", JSON.stringify(db_data, 'utf-8'));
    break;
  } else {
    console.log("Invalid command");
    console.log("Available commands are: set, get, delete, getAll, exit");
  }
}
