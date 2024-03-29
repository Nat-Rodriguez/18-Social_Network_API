const express = require('express');
const db = require('./src/config/connection');
const routes = require('./src/routes');
const dateFormat = require('./utils/dateFormat')


const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
