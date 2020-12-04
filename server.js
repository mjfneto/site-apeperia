const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 3333;

const server = http.createServer(function (req, res) {
  res.end();
});

server.on('request', function (req, res) {
  const { url, method } = req;

  console.log(url);

  if (url == '/' && method == 'GET') {
    fs.readFile(
      path.join(process.cwd(), 'dist/index.html'),
      function (err, data) {
        console.log(data);
        if (err) {
          res.writeHead(404);
          res.end(JSON.stringify(err));
          return;
        }
        res.writeHead(200, { 'Content-type': 'text/html' });
        res.end(data);
      }
    );
  }
});
