import Sequelize from "sequelize";
import SequelizeInstance from "../config/sequelizeInstance.js";

const InstructorList = SequelizeInstance.define("instructor_lists", {
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
      },
      {
        timestamps: false //removes the updated at and created at columns in the database for this table
      });
   
export default InstructorList;