import http from "node:http";

let server = http.createServer(function (req, res) {
  console.log(req.url); // Log the requested URL for debugging

  // Normalize URL by checking if it starts with /newpage
  if (req.url === "/newpage" && req.method === "GET") {
    // res.statusCode = 200; // Set the response status code to 200 (OK)
    // res.setHeader("Content-Type", "text/html"); // Set the response content type to HTML
    res.end("Welcome To http server");
  }
  else if ("/login" === req.url && req.method === "POST") {
    res.end("Login Successful");
  }
  else {
    // res.statusCode = 404;  // Set the response status code to 404 (Not Found)
    // res.writeHead(404, { "Content-Type": "text/html" });//  Best idiomatic way to set status code and headers
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/html");
    res.end("404 Not Found"); // Send a 404 response to the client
    console.log("No such URL");
  }

});

server.listen(3333, () => {
  console.log("Server is running on port 80(Default Port)...");
});
