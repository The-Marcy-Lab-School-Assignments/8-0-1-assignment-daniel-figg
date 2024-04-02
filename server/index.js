const path = require('path');
const express = require('express');
const app = express();

const logRoutes = (req, res, next) => {
  const time = new Date().toLocaleString();
  console.log(`${req.method}: ${req.originalUrl} - ${time}`);
  next();
};

const pathToDistFolder = path.join(__dirname, '../vite-project/dist');
const serveStatic = express.static(pathToDistFolder);

app.use(logRoutes);
app.use(serveStatic);

const serveHello = (req, res, next) => {
  const name = req.query.name || 'stranger';
  res.send(`Hello, ${name}!`);
};

app.get('/api/hello', serveHello);

const port = 8080;
app.listen(port, () => {
  console.log(`Server is now running on http://localhost:${port}`);
});
