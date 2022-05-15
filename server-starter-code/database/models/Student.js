/*==================================================
/database/database/models/Student.js

It defines the student model for the database.
==================================================*/
const Sequelize = require('sequelize');  // Import Sequelize
const db = require('../db');  // Import Sequelize database instance called "db"

const Student = db.define("student", {
  firstname: {
    type: Sequelize.STRING,
    allowNull: false
  },

  lastname: {
    type: Sequelize.STRING,
    allowNull: false
  },

  images: {
    type: Sequelize.STRING,
    defaultValue: "https://static.vecteezy.com/system/resources/previews/002/318/271/original/user-profile-icon-free-vector.jpg", 
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  GPA: {
    type: Sequelize.STRING,
    allowNull: false
  },

});

// Export the student model
module.exports = Student;