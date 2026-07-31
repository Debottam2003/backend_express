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
                for (let i of app.middlewares) {
                    await i(req, res);
                }
                if (req.method === "GET") {
                    if (app.getMethodHandlersMap[req.url]) {
                        app.getMethodHandlersMap[req.url](req, res);
                    }
                    else {
                        res.end("404 not found");
                    }
                }
                else if (req.method === "POST") {
                    if (app.postMethodHandlersMap[req.url]) {
                        app.postMethodHandlersMap[req.url](req, res);
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

// handler.call(server, req, res);
// app.listen is called by the app object but due to inner binding with server object,
// this refers to server in the handler passed in the http.createserver
// server.on("request", function (req, res) {
//     handler.call(server, req, res);
// });

//  Mental Model(Inner model simulation)
// function createServer(handler) {

//     const server = new Server();

//     server.on("request", function (req, res) {
//         handler.call(server, req, res);   // ← IMPORTANT
//     });

//     return server;

// }