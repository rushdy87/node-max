const fs = require('fs');

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === '/') {
    res.write('<html>');
    res.write('<head>');
    res.write('<title>Enter Message</title>');
    res.write('</head>');
    res.write('<body>');
    res.write(
      '<form action="/message" method="POST"><input type="text" name="message" /><button type="submit">submit</button></form>'
    );
    res.write('</body>');
    res.write('</html>');
    return res.end();
  }

  if (url === '/message' && method === 'POST') {
    const body = [];
    req.on('data', (chunk) => {
      body.push(chunk);
    });
    req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split('=')[1];
      fs.writeFileSync('message.text', message);
    });
    res.statusCode = 302;
    res.setHeader('Location', '/');
    return res.end();
  }

  res.setHeader('Content-Type', 'text/html'); //meta information
  res.write('<html>');
  res.write('<head>');
  res.write('<title>Basic Node</title>');
  res.write('</head>');
  res.write('<body>');
  res.write('<h1>Hellooo from Node.js Server</h1>');
  res.write('</body>');
  res.write('</html>');
  res.end();
};

module.exports = requestHandler;
