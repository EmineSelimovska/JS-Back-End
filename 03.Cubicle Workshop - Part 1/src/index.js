const express = require('express');


const expressConfig = require('./config/expressConfig');
const handlebarsConfig = require('./config/handlebarsConfig');
const routes = require('./routes');

const app = express();

const PORT = 5000;

expressConfig(app);
handlebarsConfig(app);

app.use(routes);


app.listen(PORT, console.log(`Listening on port ${PORT}! Now its up to you...`));