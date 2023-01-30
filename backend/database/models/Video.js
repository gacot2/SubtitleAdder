const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

const Video = sequelize.define('Video', {
  // Model attributes are defined here
  Video_Name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Video_Language: {
    type: DataTypes.STRING,
    references: {
        model: Languages,
        key: 'id'
      }
    // allowNull defaults to true
  },
  Video_Quality: {
    type : DataTypes.STRING,
    references: {
        model: Quality,
        key: 'id'
      }
  },
  Video_Subtitles: {
    type: DataTypes.STRING,
    references: {
        model: Subtitles,
        key: 'id'
      }
  },
  Video_Audio: {
    //fk to the video table
    type: DataTypes.STRING,
    references: {
        model: Audio,
        key: 'id'
      }
  },
}, {
  sequelize,
  modelName: "Video"
  // Other model options go here
});

// `sequelize.define` also returns the model
console.log(Video === sequelize.models.Video); // true