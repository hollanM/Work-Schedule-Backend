import Sequelize from "sequelize";
import SequelizeInstance from "../config/sequelizeInstance.js";

const Instructor = SequelizeInstance.define("instructors", {
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
    email: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null,
      },
      instructor_list_id:{
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: null,
        references:{
            model: "instructor_lists",
            key: "id",
        }   
      },
    },
      {
        timestamps: false //removes the updated at and created at columns in the database for this table
      });
   
export default Instructor;