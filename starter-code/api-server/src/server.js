'use strict';

const express = require('express');

const errorHandler = require('./error-handlers/404.js');
const {notFound} = require('./error-handlers/500.js');
const logger = require('./middleware/logger.js');

const v1Routes = require('./routes/v1');

const app = express();

app.use(express.json());

app.use(logger);

app.use( v1Routes);

app.use(notFound);
app.use(errorHandler);


module.exports = {
  server: app,
  start: port => {
    if (!port) { throw new Error('Missing Port'); }
    app.listen(port, () => console.log(`Listening on ${port}`));
  },
};
