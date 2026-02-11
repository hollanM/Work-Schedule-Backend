import Sequelize from "sequelize";
import SequelizeInstance from "../config/sequelizeInstance.js";

// Samuel Harris Changes - 2/11/2026 @ 2:30 PM
// set lowercase 
// changed pay_rate to float
const Employee = SequelizeInstance.define("employee", {
    name: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    phone_num: {
      type: Sequelize.STRING,
    },
    oc_id: {
      type: Sequelize.INTEGER,
    },
    pay_rate: {
      type: Sequelize.FLOAT,
    },
    clocked_in: {
      type: Sequelize.BOOLEAN,
    },
    has_qualification_list_id: {
      type: Sequelize.INTEGER,
    },
    app_settings_id: {
      type: Sequelize.INTEGER,
    },
    preferred_work_time_id: {
      type: Sequelize.INTEGER,
    },
  });
   
export default Employee;
