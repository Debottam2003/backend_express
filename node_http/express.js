//My express server
import http from "http";

function okudera() {

    let app = async function (req, res) {
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
    }

    app.getMethodHandlersMap = {};
    app.postMethodHandlersMap = {};
    app.putMethodHandlersMap = {};
    app.patchMethodHandlersMap = {};
    app.deleteMethodHandlersMap = {};
    app.middlewares = [];

    app.get = function (routname, handler) {
        this.getMethodHandlersMap[routname] = handler;
    }
    app.post = function (routname, handler) {
        this.postMethodHandlersMap[routname] = handler;
    }
    app.use = function (handler) {
        this.middlewares.push(handler);
    }
    app.listen = function (port, handler) {
        const server = http.createServer(app);
        server.listen(port, handler);
    }

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