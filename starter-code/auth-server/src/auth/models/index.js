'use strict';

const userModel = require('./users.js');
const { Sequelize, DataTypes } = require('sequelize');

const DATABASE_URL = process.env.DATABASE_URL || 'postgres://localhost:5432/nedalalashqar';

// config for prod
const sequelize = new Sequelize(DATABASE_URL, {});


module.exports = {
  db: sequelize,
  users: userModel(sequelize, DataTypes),
}
