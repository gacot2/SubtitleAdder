const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

const VideoQuality = sequelize.define('VideoQuality', {
  // Model attributes are defined here
  VideoQuality_Name_Width: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  VideoQuality_Name_Length: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
}, {
  sequelize,
  modelName: "VideoQuality"
  // Other model options go here
});

// `sequelize.define` also returns the model
console.log(VideoQuality === sequelize.models.VideoQuality); // true