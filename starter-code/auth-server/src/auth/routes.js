'use strict';

const express = require('express');
const authRouter = express.Router();

const { users } = require('./models');
const basicAuth = require('./middleware/basic.js')
const bearerAuth = require('./middleware/bearer.js')
const permissions = require('./middleware/acl.js')
const acl = require('./middleware/acl')
authRouter.post('/signup', async (req, res, next) => {
  try {
    let userRecord = await users.create(req.body);
    const output = {
      user: userRecord,
      token: userRecord.token
    };
    res.status(201).json(output);
  } catch (e) {
    next(e.message)
  }
});

authRouter.post('/signin', basicAuth, (req, res, next) => {
  const user = {
    user: req.user,
    token: req.user.token
  };
  res.status(200).json(user);
});

authRouter.get('/users', bearerAuth, permissions('delete'), async (req, res, next) => {
  const userRecords = await users.findAll({});
  const list = userRecords.map(user => user.username);
  res.status(200).json(list);
});

authRouter.get('/secret', bearerAuth, async (req, res, next) => {
  res.status(200).send('Welcome to the secret area')
});

////////////////////////////////////////////////

authRouter.post('/test', bearerAuth, acl("create") , (req, res) => {
  res.send(' testing runing at create !!')
});

authRouter.put('/test', bearerAuth, acl("update") ,  (req, res) => {
   res.send(' testing runing at update !')
});

authRouter.delete('/test', bearerAuth, acl("delete") ,  (req, res) => {
   res.send(' testing runing at delete !')
});

authRouter.get('/test', bearerAuth, acl("read") ,  (req, res) => {
   res.send(' testing runing at read !');
});

module.exports = authRouter;
