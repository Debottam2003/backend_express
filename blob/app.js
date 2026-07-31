import fs from 'fs';

let response = await fetch('https://healthyfy-lzod.vercel.app/');
let data = await response.blob();

fs.writeFileSync("./index.txt", Buffer.from(await data.arrayBuffer()), 'utf-8');