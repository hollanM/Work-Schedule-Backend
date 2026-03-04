import Sequelize from "sequelize";
import SequelizeInstance from "../config/sequelizeInstance.js";

const Position = SequelizeInstance.define("positions", {
    id: {
      type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: true,
        defaultValue: null,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: true,
        defaultValue: null,
    },
    qualification_list_id:{
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: null,
        //foreign key reference to qualification_lists table
        
        references: {
            model: "qualification_lists",
            key: "id",
        },
        
    },
    department_id:{
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: null,
        //foreign key reference to departments table
      
        references: {
            model: "departments",
            key: "id",
        },
      
    }
  });
   
export default Position;
