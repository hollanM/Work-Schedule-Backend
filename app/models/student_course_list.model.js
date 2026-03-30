import Sequelize from "sequelize";
import SequelizeInstance from "../config/sequelizeInstance.js";

const StudentCourseList = SequelizeInstance.define("student_course_lists", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: null,
        references:{
            model: "users",
            key: "id",
        }
      },
    course_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: null,
      },
    },
      {
        timestamps: false //removes the updated at and created at columns in the database for this table
      }
    );
   
export default StudentCourseList;