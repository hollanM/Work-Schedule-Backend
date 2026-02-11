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
      defaultValue: ""
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: ""
    },
    to: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: ""
    },
    type: {
      // Learn for Enum
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: ""
    },
    is_read: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    date_time_sent: {
      type: Sequelize.DATE,
      allowNull: true,
      defaultValue: null
    },
    notificationListId: {
      // foreign key to NotificationList 
      type: Sequelize.INTEGER,

    
      allowNull: false,
      //added a references to notification list here,
      //that way the database will make sure its a valid
      //id :) (Julian)
      references: {
          model: "notification_lists",
          key: "id"
      }
    },
  });

export default Notification;
