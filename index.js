const http = require("http");
const fs = require("fs");
const path = require("path");
const minimist = require("minimist");

const args = minimist(process.argv.slice(2));
const port = args.port || 3000;

const server = http.createServer((req, res) => {
  let filePath = "";

  if (req.url === "/" || req.url === "/home") {
    filePath = path.join(__dirname, "home.html");
  } else if (req.url === "/project") {
    filePath = path.join(__dirname, "project.html");
  } else if (req.url === "/registration") {
    filePath = path.join(__dirname, "registration.html");
  } else {
    res.statusCode = 404;
    res.end("404 Not Found");
    return;
  }

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.statusCode = 500;
      res.end("Server Error");
    } else {
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/html");
      res.end(content);
    }
  });
});

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
