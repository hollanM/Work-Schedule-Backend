import Sequelize from "sequelize";
import SequelizeInstance from "../config/sequelizeInstance.js";

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
    OC_id: {
      type: Sequelize.INTEGER,
    },
    pay_rate: {
      type: Sequelize.DECIMAL,
    },
    Clocked_in: {
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
