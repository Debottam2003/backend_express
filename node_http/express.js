//My express server
import http from "http";

function okudera() {
    let app = {
        getMethodHandlersMap: {},
        postMethodHandlersMap: {},
        putMethodHandlersMap: {},
        patchMethodHandlersMap: {},
        deleteMethodHandlersMap: {},
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
            const server = http.createServer(async (req, res) => {
                for (let i of this.middlewares) {
                    await i(req, res);
                }
                if (req.method === "GET") {
                    if (this.getMethodHandlersMap[req.url]) {
                        this.getMethodHandlersMap[req.url](req, res);
                    }
                    else {
                        res.end("404 not found");
                    }
                }
                else if (req.method === "POST") {
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

okudera.json = () => {
    return async (req, res) => {
        let data = '';
        return new Promise(resolve => {
            req.on('data', chunk => data += chunk);
            req.on('end', () => {
                try {
                    req.body = JSON.parse(data || '{}');
                    resolve();
                } catch (err) {
                    req.body = {};
                    resolve();
                }
            });
        });
    };
};

export default okudera;