console.log("This is text1...");

// const fs = require('fs').promises;
// const path = require('path');
// async function writeFileAsync(filePath, data) {
//     try {
//         const fullPath = path.join(__dirname, filePath);
//         await fs.writeFile(fullPath, data, 'utf8');
//         console.log(`File written successfully at ${fullPath}`);
//     } catch (err) {
//         console.error('Error writing file:', err);
//     }
// }

//...Async await based...
// writeFileAsync('text1.txt', 'Hello, Debottam!');
// const fs = require('fs').promises;
// async function writeFileAsync(filePath, data) {
//     try {
//         await fs.writeFile(filePath, data, 'utf8');
//         console.log('File written successfully!');
//     } catch (err) {
//         console.error('Error writing file:', err);
//     }
// }
// writeFileAsync('./text3.txt', 'Hello, Debottam!');

// ... (.then) based...
// const fs = require('fs').promises;
// fs.writeFile('./text3.txt', 'Hello, World!', 'utf8')
//     .then(() => console.log('File written successfully!'))
//     .catch((err) => console.error('Error writing file:', err));

// ...Callback... based
// const fs = require('fs');
// fs.writeFile('./text3.txt', "This is the new Debottam...", 'utf8', (err)=>{
//     if(err){
//         console.log('Error writing file:', err);
//     }
//     else{
//         console.log("File written successfully");
//     }
// })

// ...Syncronus based...
// const fs = require('fs');
// try {
//     fs.writeFileSync('./text3.txt', 'Hello, World!', 'utf8');
//     console.log("File written successfully");
// }
// catch (err) {
//     console.log('Error writing file:', err);
// }

const fs = require('fs');
// Writing a file
fs.writeFileSync('text3.txt', 'Hello, দেবোত্তম! 🚀', 'utf8');
// Reading a file
const content = fs.readFileSync('text3.txt', 'utf8');
console.log(content);  // Output: Hello, দেবোত্তম! 🚀

console.log("This is text2...");
