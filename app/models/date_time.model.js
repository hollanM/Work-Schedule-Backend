import Sequelize from "sequelize";
import SequelizeInstance from "../config/sequelizeInstance.js";

const Date_time = SequelizeInstance.define("date_times", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    first_date_time: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    second_date_time: {
      type: Sequelize.DATE,
      allowNull: true,
    },
  },
  {
    timestamps: false //removes the updated at and created at columns in the database for this table
  });
   
export default Date_time;
