import fs from 'node:fs/promises';
import file from 'node:fs';

await fs.appendFile("./text4.txt", "\nThis is appending in a file.", "utf8");

console.log("Appending file is done");

// await fs.unlink("./text4.txt");

// console.log("Delete file is done");

// Delete a file
// await fs.rm('./file.txt');

// Delete a non-empty directory
await fs.rm('./myDir', { recursive: true, force: true });

try {
    if (!file.existsSync("./myNewFolder")) {
        await fs.mkdir('./myNewFolder');
        console.log('Folder created!');
    }
    let st = await fs.stat("./myNewFolder");
    console.log(st);
    console.log(st.isDirectory());
    // console.log(Object.getPrototypeOf(Object.getPrototypeOf(st)));
    // console.log(st.__proto__);
} catch (err) {
    console.error('Error creating folder:', err);
}

// await mkdir('./parent/child', { recursive: true });



