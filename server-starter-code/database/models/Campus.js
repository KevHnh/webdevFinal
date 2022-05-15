/*==================================================
/database/database/models/Campus.js

It defines the campus model for the database.
==================================================*/
const Sequelize = require('sequelize');  // Import Sequelize
const db = require('../db');  // Import Sequelize database instance called "db"

// Define the campus model
const Campus = db.define("campus", {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },

  address: {
    type: Sequelize.STRING,
    allowNull: false
  },

  description: {
    type: Sequelize.STRING,
  },

  images: {
    type: Sequelize.STRING,
    defaultValue: "https://thumbs.dreamstime.com/b/illustration-building-icon-white-background-building-icon-white-background-107844010.jpg",
  }
});

// Export the campus model
module.exports = Campus;