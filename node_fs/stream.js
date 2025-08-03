// const fs = require('fs');

// const readStream = fs.createReadStream('./example.txt', { encoding: 'utf8' });

// readStream.on('data', (chunk) => {
//   console.log('Chunk received:', chunk); // Async — happens over time
// });

// readStream.on('end', () => {
//   console.log('Finished reading file.');
// });

// readStream.on('error', (err) => {
//   console.error('Error reading file:', err);
// });

// const fs = require('fs');

// function readFileAsStream(path) {
//   return new Promise((resolve, reject) => {
//     const chunks = [];
//     const stream = fs.createReadStream(path, { encoding: 'utf8' });

//     stream.on('data', chunk => chunks.push(chunk));
//     stream.on('end', () => resolve(chunks.join('')));
//     stream.on('error', reject);
//   });
// }

// (async () => {
//   try {
//     const data = await readFileAsStream('./example.txt');
//     console.log('Full file content:\n', data);
//   } catch (err) {
//     console.error('Error reading stream:', err);
//   }
// })();

// const fs = require('fs');

// const writeStream = fs.createWriteStream('./output.txt', { encoding: 'utf8' });

// writeStream.write('Hello, this is the first line.\n');
// writeStream.write('This is the second line.\n');

// writeStream.end(); // Signal that you're done writing

// writeStream.on('finish', () => {
//   console.log('File has been written.');
// });

// writeStream.on('error', (err) => {
//   console.error('Error writing to file:', err);
// });

// const fs = require('fs');

// function writeToFileStream(path, content) {
//   return new Promise((resolve, reject) => {
//     const stream = fs.createWriteStream(path, { encoding: 'utf8' });

//     stream.write(content);
//     stream.end();

//     stream.on('finish', resolve);
//     stream.on('error', reject);
//   });
// }

// (async () => {
//   try {
//     await writeToFileStream('./output.txt', 'Async content line 1\nAsync content line 2\n');
//     console.log('Write complete!');
//   } catch (err) {
//     console.error('Write failed:', err);
//   }
// })();

// const fs = require('fs');

// const readStream = fs.createReadStream('./source.txt');   // Source file
// const writeStream = fs.createWriteStream('./destination.txt'); // Destination file

// readStream.pipe(writeStream);

// writeStream.on('finish', () => {
//   console.log('File copied successfully.');
// });

// writeStream.on('error', (err) => {
//   console.error('Write error:', err);
// });

// readStream.on('error', (err) => {
//   console.error('Read error:', err);
// });
