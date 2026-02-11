import Sequelize from "sequelize";
import SequelizeInstance from "../config/sequelizeInstance.js";

const Availability = SequelizeInstance.define("availabilities", {
    id: {
      type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    type: {
      type: Sequelize.ENUM,
        values: ['unavailable', 'preferred', 'unset',],
        defaultValue: 'unset',
        allowNull: false,
    },
    date_start_time_id: {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: null,     
      //foreign key reference to date_times table
      /*
      references:{
            model: "date_times",
            key: "id",
        }
        */
    },    
    date_end_time_id:{
        type: Sequelize.INTEGER,
        allowNull: true,
      defaultValue: null,   
        //foreign key reference to date_times table
        /*
        references:{
            model: "date_times",
            key: "id",
        }   
        */
    },
    employee_id:{
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: null,
        //foreign key reference to employees table
        /*
        references: {
            model: "employees",
            key: "id",
        },
        */
    }
  });
   
export default Availability;
