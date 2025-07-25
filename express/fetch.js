import axios from "axios";

let response = await fetch("http://localhost:3333/");
if (!response.ok) {
    console.log("Error in data fetching");
}
else {
    // let data = await response.text();
    let data = await response.json();
    // Encode           Decode 
    // json(string) --- text()/json()
    // json(object) --- json() // if use text() will the get the json data as a string so it is not useful
    // send(string) --- text() // if apply json() invalid json data and Content-Type is also different
    // send(object) --- json() // if use text() will the get the json data as a string so it is not useful
    console.log(data);
}

let res = await axios.get("http://localhost:3333/");
// console.log(res);
if (!res.status === 200 || !res.statusText === 'OK') {
    console.log("Error in data fetching");
}
else {
    console.log(res.data);
}