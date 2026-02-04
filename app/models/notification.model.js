import Sequelize from "sequelize";
import SequelizeInstance from "../config/sequelizeInstance.js";

const Notification = SequelizeInstance.define("notification", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    to: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    type: {
      // Learn for Enum
      type: Sequelize.STRING,
      allowNull: false,
    },
    is_read: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
    date_time_sent: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    notificationListId: {
      // foreign key to NotificationList 
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  });

export default Notification;
