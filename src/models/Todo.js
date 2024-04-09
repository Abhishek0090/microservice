// models/Todo.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Todo = sequelize.define(
  "todo",
  {
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "todos", // Explicitly specify the table name
  }
);

module.exports = Todo;
