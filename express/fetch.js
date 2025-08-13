// import axios from "axios";

let response = await fetch("http://localhost:3333/");
if (!response.ok) {
    console.log("Error in data fetching");
}
else {
    // let data = await response.text();
    // let data = await response.json();
    let data = await response.blob();
    // Encode           Decode 
    // json(string) --- text()/json()
    // json(object) --- json() // if use text() will the get the json data as a string so it is not useful
    // send(string) --- text() // if apply json() invalid json data and Content-Type is also different
    // send(object) --- json() // if use text() will the get the json data as a string so it is not useful
    // sendFile('filename') --- blob()
    let arrayBuffer = await data.arrayBuffer(); // Convert Blob to ArrayBuffer
    console.log(data);

    console.log(arrayBuffer);
    let uint8arr = new Uint8Array(arrayBuffer); // View it as byte array
    console.log(uint8arr);

    let buffer1 = Buffer.from(arrayBuffer); // Convert to Node.js Buffer from ArrayBuffer
    let buffer2 = Buffer.from(uint8arr); // Alternate way: Convert to Node.js Buffer from Uint8Array
    console.log(buffer1);
    console.log(buffer2);
}

// let res = await axios.get("http://localhost:3333/");
// // console.log(res);
// if (!res.status === 200 || !res.statusText === 'OK') {
//     console.log("Error in data fetching");
// }
// else {
//     console.log(res.data);
// }

// client side logic
// let response = await fetch("http://localhost:3333/image");
// let blob = await response.blob();

// let imageUrl = URL.createObjectURL(blob); // ✅ create a temporary URL

// let img = document.createElement("img");
// img.src = imageUrl;
// img.alt = "Fetched image";
// document.body.appendChild(img);

// img.onload = () => {
//     URL.revokeObjectURL(imageUrl);
// };

// ✅ Best Practice:

// Always revoke the URL after the image is loaded, like this:

// const url = URL.createObjectURL(blob);
// img.src = url;

// img.onload = () => {
//   URL.revokeObjectURL(url); // Safe to clean up memory now
// };

// Think of it like this:

//     createObjectURL() = You give the browser a key to read the image.

//     img.src = ... = The browser uses the key to open and load the image.

//     revokeObjectURL() = You take the key away after the image is loaded.

//     🔒 But the browser already has the image — it doesn't need the key anymore!

// let response = await fetch("http://localhost:3333/image");
// let blob = await response.blob();

// let downloadUrl = URL.createObjectURL(blob);

// let a = document.createElement("a");
// a.href = downloadUrl;
// a.download = "downloaded-image.jpg"; // set the filename
// document.body.appendChild(a);
// a.click();
// document.body.removeChild(a);

// // optional: release memory
// URL.revokeObjectURL(downloadUrl);

// const express = require("express");
// const fs = require("fs");
// const app = express();

// app.get("/image-json", (req, res) => {
//   // Load image as Buffer
//   const imgBuffer = fs.readFileSync("myImage.png");

//   // Send JSON containing the buffer
//   res.json({
//     message: "Here’s your image",
//     img_buffer: imgBuffer
//   });
// });

// app.listen(3000, () => console.log("Server running on port 3000"));

// <!DOCTYPE html>
// <html>
// <body>
//   <h2>Image from JSON Buffer</h2>
//   <img id="image" alt="Loaded from API" />

//   <script>
//     fetch("http://localhost:3000/image-json")
//       .then(res => res.json())
//       .then(data => {
//         // Convert array of bytes back to binary
//         const byteArray = new Uint8Array(data.img_buffer.data);

//         // Wrap in a Blob with correct MIME type
//         const blob = new Blob([byteArray], { type: "image/png" });

//         // Create an object URL for <img>
//         const url = URL.createObjectURL(blob);
//         document.getElementById("image").src = url;
//       })
//       .catch(err => console.error(err));
//   </script>
// </body>
// </html>

// img.src = "data:image/png;base64," + data.img_base64;