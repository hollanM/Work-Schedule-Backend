import Sequelize from "sequelize";
import SequelizeInstance from "../config/sequelizeInstance.js";

const Time_Off_Requests = SequelizeInstance.define("time_off_requests", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
    date_time_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: null,
        
        references:{
            model: "date_times",
            key: "id",
        }   
        
      },
    is_available: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: true,
      },
    is_approved: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    employee_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: null,
        
        references:{
            model: "employee",
            key: "id",
        }   
        
      },
      },
      {
        timestamps: false //removes the updated at and created at columns in the database for this table
      });
   
export default Time_Off_Requests;