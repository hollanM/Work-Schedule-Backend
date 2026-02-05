import Sequelize from "sequelize";
import SequelizeInstance from "../config/sequelizeInstance.js";

const Time_off = SequelizeInstance.define("time_offs", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
    date_time_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        /*
        references:{
            model: "date_times",
            key: "id",
        }   
        */
      },
    is_available: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
    is_approved: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
    employee_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        /*
        references:{
            model: "employee",
            key: "id",
        }   
        */
      },
      },
      {
        timestamps: false //removes the updated at and created at columns in the database for this table
      });
   
export default Time_off;
