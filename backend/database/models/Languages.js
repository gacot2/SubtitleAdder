const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

const Language = sequelize.define('Language', {
  // Model attributes are defined here
  Language_Name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Language_Flag: {
    type: DataTypes.STRING,
    allowNull: true
    // allowNull defaults to true
  },
}, {
  sequelize,
  modelName: "Language"
  // Other model options go here
});

// `sequelize.define` also returns the model
console.log(Language=== sequelize.models.Language); // true