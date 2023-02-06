const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("sqlite::memory:");

const Fonts = sequelize.define(
  "Fonts",
  {
    // Model attributes are defined here
    Font_Name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    modelName: "Fonts",
    // Other model options go here
  }
);

// `sequelize.define` also returns the model
console.log(Fonts === sequelize.models.Fonts); // true
