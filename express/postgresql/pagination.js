let response = await fetch(`http://localhost:3333/data/${100}/${255}`);
let data = await response.json();
console.log(data);