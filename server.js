const
  express = require('express'),
  serveStatic = require('serve-static'),
  path = require('path'),
  port = process.env.PORT || 7000;

const app = express();

app.use(serveStatic(path.join(__dirname, '/dist/spa')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'index.html'));
});

app.listen(port);

console.log('server started '+ port)
