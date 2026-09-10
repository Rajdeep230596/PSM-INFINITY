const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");

const port = Number(process.env.PORT) || 3000;
const hostname = "0.0.0.0";
const app = next({ dev: false, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    handle(req, res, parse(req.url || "/", true));
  }).listen(port, hostname, () => {
    console.log(`storage-poc listening on ${hostname}:${port}`);
  });
});
