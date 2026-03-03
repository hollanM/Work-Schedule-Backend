import Sequelize from "sequelize";
import SequelizeInstance from "../config/sequelizeInstance.js";

const Department = SequelizeInstance.define("departments", {
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
    break_time_allotted: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: null,
      },
      },
      {
        timestamps: false //removes the updated at and created at columns in the database for this table
      });
   
export default Department;
