const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("sqlite::memory:");

const Country = sequelize.define(
  "Country",
  {
    // Model attributes are defined here
    Country_Name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    Country_Abreviation: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    //Link to the country flag emoji
    Country_Flag: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    modelName: "Country",
    // Other model options go here
  }
);

// `sequelize.define` also returns the model
console.log(Country === sequelize.models.Country); // true
