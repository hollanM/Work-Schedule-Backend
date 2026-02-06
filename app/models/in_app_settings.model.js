import Sequelize from "sequelize";
import SequelizeInstance from "../config/sequelizeInstance.js";

const In_app_settings = SequelizeInstance.define("in_app_settings", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
    app_setting_1: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
    app_setting_2: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
    app_setting_3: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      },
      {
        timestamps: false //removes the updated at and created at columns in the database for this table
      });
   
export default In_app_settings;
