const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

const Subtitles = sequelize.define('Subtitles', {
  // Model attributes are defined here
  Subtitle_Font: {
    type: DataTypes.INTEGER,

  },
  Subtitle_Rate: {
    type: DataTypes.INTEGER,
  },
  Subtitle_Color: {
    type: DataTypes.INTEGER,
  },
  Subtitle_Confidence: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  Subtitle_Position: {
    type: DataTypes.STRING,
  },
  //Point to a position on a server
  Subtitle_Text: {
    type: DataTypes.STRING,
  },
}, {
  sequelize,
  modelName: "Subtitles"
  // Other model options go here
});

// `sequelize.define` also returns the model
console.log(Subtitles === sequelize.models.Subtitles); // true