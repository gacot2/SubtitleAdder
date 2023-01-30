const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

const User = sequelize.define('User', {
  // Model attributes are defined here
  User_First_Name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  User_Last_Name: {
    type: DataTypes.STRING,
    allowNull: false
    // allowNull defaults to true
  },
  User_Username: {
    type : DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  User_Email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  User_Video: {
    //fk to the video table
    type: DataTypes.STRING,
    references: {
      model: Photo,
      key: 'id'
    }
  },
  User_Gener: {
    //fk to the gender table
    type: DataTypes.STRING,
    references: {
      model: Gender,
      key: 'id'
    }

  },
  User_Country: {
    //fk to the gender table
    type: DataTypes.STRING,
    references: {
      model: Gender,
      key: 'id'
    }
  },
  User_Photo: {
    //reference to the photo folder 
    //TODO LATER
    type: DataTypes.STRING,
    unique: true
  },
  User_Creation_Date:{
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  User_Update_Date:{
    type: DataTypes.DATE
  }



}, {
  sequelize,
  modelName: "User"
  // Other model options go here
});

// `sequelize.define` also returns the model
console.log(User === sequelize.models.User); // true