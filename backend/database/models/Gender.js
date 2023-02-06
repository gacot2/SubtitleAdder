const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

const Gender = sequelize.define('Gender', {
  // Model attributes are defined here
  Gender_Name: {
    type: DataTypes.STRING,
    allowNull: true
  }

}, {
  sequelize,
  modelName: "Gender"
  // Other model options go here
});

// `sequelize.define` also returns the model
console.log(Gender === sequelize.models.Gender); // true