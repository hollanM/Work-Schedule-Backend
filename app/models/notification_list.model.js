import Sequelize from "sequelize";
import SequelizeInstance from "../config/sequelizeInstance.js";

const NotificationList = SequelizeInstance.define("notification_lists", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
      
    //a reminder for me to put references here - Julian
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: null,
        references: {
          model: "users",
          key: "id",
        },
      },
      department_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: null,
            references: {
            model: "departments",   
            key: "id",
        },
      },
  });

export default NotificationList;