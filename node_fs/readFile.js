console.log("This is the text1...");

import file from 'fs';
import fs from 'fs/promises';

// Asynchronously read the contents of 'movies.csv' file
file.readFile('./text1.txt', 'utf8', (err, data) => {
    if (err) {
        console.log("Data can not read the file ", err);
    } else {
        console.log(data);
    }
});
console.log("This is the text2...");

// Synchronously read the contents of 'movies.json' file
const data = file.readFileSync('./package.json', 'utf8');
console.log(JSON.parse(data));
console.log("This is the text1...");

// Async function to read a file using promises
console.log("This is text1...");
async function readFileAsync(filePath) {
    try {
        let data = await fs.readFile(filePath, 'utf8');
        console.log(data);
    } catch (err) {
        console.log("Error reading the file", err);
    }
}
await readFileAsync('./text1.txt');
console.log("This is the text1...");

// Read file using promises with then/catch
console.log("This is text1...");
fs.readFile('./text1.txt', 'utf8')
    .then((data) => {
        console.log(data);
    })
    .catch((err) => {
        console.log("Error reading the file", err);
    });
console.log("This is the text2...");
 