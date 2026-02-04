import Sequelize from "sequelize";
import SequelizeInstance from "../config/sequelizeInstance.js";

const Manager_List = SequelizeInstance.define("manager_lists", {
    id: {
      type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    employee_id: {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: null,
      /*
        references: {
            model: 'employees',
            key: 'id'
        }
        */ 
    },
        department_id: {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: null,
      /*
        references: {
            model: 'departments',
            key: 'id'
        }
        */ 
    }
  });
   
export default Manager_List;
