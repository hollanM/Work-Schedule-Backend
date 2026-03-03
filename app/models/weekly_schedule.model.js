import Sequelize from "sequelize";
import SequelizeInstance from "../config/sequelizeInstance.js";

const Weekly_Schedule = SequelizeInstance.define("weekly_schedules", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    start_day_id:{
        type: Sequelize.INTEGER,
        allowNull: true,
      defaultValue: null,

    references:{
      model: "date_times",
      key: "id",

    },
  },
     end_day_id:{
        type: Sequelize.INTEGER,
        allowNull: true,
      defaultValue: null,
        
    references:{
      model: "date_times",
      key: "id",
    }

    
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
  });
  

export default Weekly_Schedule;