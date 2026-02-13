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
        allowNull: false,
      },
    department_schedule: {
        type: Sequelize.INTEGER,
        allowNull: false,
        /*
        references:{
            model: "department_schedule",
            key: "id",
        }   
        */
      },
    break_time_allotted: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      },
      {
        timestamps: false //removes the updated at and created at columns in the database for this table
      });
   
export default Department;
