const express = require('express');


const expressConfig = require('./config/expressConfig');
const handlebarsConfig = require('./config/handlebarsConfig');
const dbConfig = require('./config/dbconfig');
const routes = require('./routes');

const app = express();

const PORT = 5000;

expressConfig(app);
handlebarsConfig(app);

dbConfig()
  .then(() => console.log('DB Connected successfully'))
  .catch(err => console.log('DB error:', err.message));

app.use(routes);


app.listen(PORT, console.log(`Listening on port ${PORT}! Now its up to you...`));