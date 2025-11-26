//My express server
import http from "http";

function express() {
    let app = {
        getMethodHandlersMap: {},
        postMethodHandlersMap: {},
        middlewares: [],
        get(routname, handler) {
            this.getMethodHandlersMap[routname] = handler;
        },
        post(routname, handler) {
            this.postMethodHandlersMap[routname] = handler;
        },
        use(handler) {
            this.middlewares.push(handler);
        },
        listen(port, handler) {
            handler();
            const server = http.createServer((req, res) => {
                for (let i of this.middlewares) {
                    i(req, res);
                }
                if (req.method === "GET") {
                    if (this.getMethodHandlersMap[req.url]) {
                        this.getMethodHandlersMap[req.url](req, res);
                    }
                    else {
                        res.end("404 not found");
                    }
                }
                else {
                    if (this.postMethodHandlersMap[req.url]) {
                        this.postMethodHandlersMap[req.url](req, res);
                    }
                    else {
                        res.end("404 not found");
                    }
                }
            });
            server.listen(port);
        }
    };
    return app;
}

export default express;