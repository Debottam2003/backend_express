import http from 'http';
import os from 'os';

// console.log(os.cpus().length);
// console.log(os.cpus());

import cluster from 'cluster';

if (cluster.isPrimary) {
    for (let i = 0; i < os.cpus().length; i++) {
        let worker = cluster.fork();
        console.log("Worker process id: ", worker.process.pid);
    }
} else {
    let server = http.createServer((req, res) => {
        if (req.url === "/" && req.method === "GET") {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Hello from worker process');
        }
    });
    server.listen(3333, () => {
        console.log("Server is listening and serve on port: 3333");
    })
}