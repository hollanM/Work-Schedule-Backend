import Sequelize from "sequelize";
import SequelizeInstance from "../config/sequelizeInstance.js";

const NotificationList = SequelizeInstance.define("notification_list", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
      
    //a reminder for me to put references here - Julian
      employee_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      department_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
  });

export default NotificationList;
