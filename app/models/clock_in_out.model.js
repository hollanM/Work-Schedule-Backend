import Sequelize from "sequelize";
import SequelizeInstance from "../config/sequelizeInstance.js";

const Clock_In_Out = SequelizeInstance.define("clock_in_outs", {
    id: {
      type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
   day:{
        type: Sequelize.DATEONLY,
        allowNull: true,
        defaultValue: null,
    },
    time:{
        type: Sequelize.TIME,
        allowNull: true,
        defaultValue: null,
   },
    clock_list_id:{
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: null,
        references:{
            model: "clock_lists",
            key: "id",
        }
    }
  });
   
export default Clock_In_Out;
