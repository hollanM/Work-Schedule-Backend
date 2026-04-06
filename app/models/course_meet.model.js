import Sequelize from "sequelize";
import SequelizeInstance from "../config/sequelizeInstance.js";

const CourseMeet = SequelizeInstance.define("course_meets", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
    meet_day: {
        type: Sequelize.ENUM("Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday", "Unset"),
        allowNull: true,
        defaultValue: "Unset",
      },
    start_time: {
        type: Sequelize.TIME,
        allowNull: true,
        defaultValue: null
      },
    end_time: {
        type: Sequelize.TIME,
        allowNull: true,    
        defaultValue: null
        },
        course_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: null,
        references:{
            model: "courses",
            key: "id",
        }
    },
    },
      {
        timestamps: false //removes the updated at and created at columns in the database for this table
      });
   
export default CourseMeet;