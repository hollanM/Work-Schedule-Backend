import Sequelize from "sequelize";
import SequelizeInstance from "../config/sequelizeInstance.js";

const In_app_settings = SequelizeInstance.define("in_app_settings", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
    emails: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    text_messages: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      user_id: {
              type: Sequelize.INTEGER,
              allowNull: true,
              defaultValue: null,
                references:{
                  model:"users",
                  key:"id"
            }
              
            },
          
      },
      {
        timestamps: false //removes the updated at and created at columns in the database for this table
      });
   
export default In_app_settings;