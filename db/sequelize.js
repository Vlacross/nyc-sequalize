const Sequelize = require('sequelize');

const { DATABASE_URL, SEQUELIZE_OPTIONS, DATABASE_USER, DATABASE_PWD } = require('../config');

console.log(`Connecting to database at ${DATABASE_URL}`)
const sequelize =  new Sequelize(DATABASE_URL, DATABASE_USER, DATABASE_PWD, SEQUELIZE_OPTIONS);

module.exports = {
  sequelize
};
