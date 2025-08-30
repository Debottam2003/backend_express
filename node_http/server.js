import http from 'http';

let server = http.createServer(function (req, res) {
    console.log(req.url);  // Log the requested URL for debugging

    // Normalize URL by checking if it starts with /newpage
    if (req.url === "/newpage" && req.method === 'GET') {
        res.end('Welcome To http server');
    } else {
        // res.statusCode = 404;  // Set the response status code to 404 (Not Found)
        res.writeHead(404, { "Content-Type": "text/html" });
        res.end('404 Not Found');  // Send a 404 response to the client
        console.log("No such URL");
    }
});

server.listen(80, () => {
    console.log("Server is running on port 80(Default Port)...");
});
