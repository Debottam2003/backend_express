import http from 'http';

let server = http.createServer(function (req, res) {
    console.log(req.url);  // Log the requested URL for debugging

    // Normalize URL by checking if it starts with /newpage
    if (req.url === "/newpage" && req.method === 'GET') {
        res.end('Welcome');
    } else {
        res.statusCode = 404;  // Set the response status code to 404 (Not Found)
        res.end('404 Not Found');  // Send a 404 response to the client
        console.log("No such URL");
    }
});

server.listen(3333, () => {
    console.log("Server is running on port 3003...");
});
