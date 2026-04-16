import Sequelize from "sequelize";
import SequelizeInstance from "../config/sequelizeInstance.js";

const Weekly_Schedule = SequelizeInstance.define("weekly_schedules", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    start_day:{
        type: Sequelize.DATE,
        allowNull: true,
      defaultValue: null,

  },
     end_day:{
        type: Sequelize.DATE,
        allowNull: true,
      defaultValue: null,


    
    },
    is_template: {
      type: Sequelize.BOOLEAN,
      allowNull: true,
      defaultValue: null
    },
    department_id: {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: null
    },

    user_id:{
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: null,
      references:{
        model: "users",
        key: "id"
      }
    }
  });
  

export default Weekly_Schedule;