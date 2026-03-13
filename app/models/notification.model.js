import Sequelize from "sequelize";
import SequelizeInstance from "../config/sequelizeInstance.js";

const Notification = SequelizeInstance.define("notifications", {
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
    type: {
      type: Sequelize.ENUM(
        "timeOffRequests",
        "swapDropRequests",
        "openShiftRequests",
        "scheduleUpdates",
        "newUserRegistrations",
        "availabilityChange",
        "clockInOutReminders",
        "overtimeAlerts",
        "payrollReminders",
        "reports",
        "workplaceAlerts",
        "shiftReminder"
      ),
      allowNull: false,
      defaultValue: ""
    },
    to: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: ""
    },
    email_pref: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: "false"
    },
    mobile_pref: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: "false"
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
    notification_list_id: {
      // foreign key to NotificationList 
      type: Sequelize.INTEGER,

    defaultValue: null,
      allowNull: true,
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