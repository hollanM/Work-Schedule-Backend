import Sequelize from "sequelize";
import SequelizeInstance from "../config/sequelizeInstance.js";

const Employee_list = SequelizeInstance.define("employee_list", {
    employee_id: {
      type: Sequelize.INTEGER,
    },
    Department: {
      type: Sequelize.INTEGER,
    },
  });
   
export default Employee_list;
