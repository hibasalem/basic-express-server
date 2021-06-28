'use strict';

const express = require('express');
const app = express();

const logger = require('./middleware/logger');
const validator = require('./middleware/validator');

const notfoundHandler = require('./error-handlers/404');
const errorHandler = require('./error-handlers/500');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);

app.get('/', lifeProof);
app.get('/bad', badHandler);
app.get('/person', validator, personHandler);

function lifeProof(req, res) {
  res.status(200).send('home route');
}

function badHandler(req, res) {
  throw new Error('some thing went wrong');
}

function personHandler(req, res) {
  const name = req.query.name;
  if (name) {
    res.status(200).json({ name });
  } else {
    res.status(500).json({ error: 'add a name' });
  }
}

app.use('*', notfoundHandler);
app.use(errorHandler);

function start(port) {
  app.listen(port, () => console.log(`listening on port ${port}`));
}

module.exports = {
  app: app,
  start: start,
};
