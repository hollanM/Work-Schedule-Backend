import Sequelize from "sequelize";
import SequelizeInstance from "../config/sequelizeInstance.js";

const Course = SequelizeInstance.define("courses", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
    name: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: "",
      },
    course_id: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: "",
      },

      start_date:{
        type: Sequelize.DATEONLY,
        allowNull: true,
        defaultValue: null,
      },
      end_date:{
        type: Sequelize.DATEONLY,
        allowNull: true,
        defaultValue: null,
      },
    },
      {
        timestamps: false //removes the updated at and created at columns in the database for this table
      }
    );
   
export default Course;