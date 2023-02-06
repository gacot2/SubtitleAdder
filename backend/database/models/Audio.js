const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("sqlite::memory:");

const Audio = sequelize.define(
  "Audio",
  {
    // Model attributes are defined here
    Audio_Type: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    Audio_Rate: {
      type: DataTypes.STRING,
    },
    //Link to the country flag emoji
  },
  {
    sequelize,
    modelName: "Audio",
    // Other model options go here
  }
);

// `sequelize.define` also returns the model
console.log(Audio === sequelize.models.Audio); // true
