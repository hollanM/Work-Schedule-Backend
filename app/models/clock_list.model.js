import Sequelize from "sequelize";
import SequelizeInstance from "../config/sequelizeInstance.js";

const Clock_List = SequelizeInstance.define("clock_list", {
    id: {
      type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id:{
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: null,
        //foreign key constraint for employees table
        
        references:{
            model: "users",
            key: "id",
        }
        
    },
    department_id:{
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: null,
        //foreign key constraint for employees table
        
        references:{
            model: "departments",
            key: "id",
        }
        
    }
  });
   
export default Clock_List;
