// db.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('perntodo', 'postgres', '123456789', {
    host: 'localhost',
    dialect: 'postgres',
});

module.exports = sequelize;
