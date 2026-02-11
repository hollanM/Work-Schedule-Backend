import dbConfig from "../config/db.config.js";
import { Sequelize } from "sequelize";
import sequelize from "../config/sequelizeInstance.js";

// Models

import User from "./user.model.js";
import Session from "./session.model.js";
import Tutorial from "./tutorial.model.js";
import Lesson from "./lesson.model.js";
import Notification from "./notification.model.js";
import NotificationList from "./notification_list.model.js"; 


const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = User;
db.session = Session;
db.tutorial = Tutorial;
db.lesson = Lesson;
db.notification = Notification;
db.notificationList = NotificationList;
db.employee = User; // Employee table has yet to exist
db.department = Tutorial; // Department table has yet to exist

// foreign key for session
db.user.hasMany(
  db.session,
  { as: "session" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.session.belongsTo(
  db.user,
  { as: "user" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

// foreign key for tutorials
db.user.hasMany(
  db.tutorial,
  { as: "tutorial" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.tutorial.belongsTo(
  db.user,
  { as: "user" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

// foreign key for lessons
db.tutorial.hasMany(
  db.lesson,
  { as: "lesson" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.lesson.belongsTo(
  db.tutorial,
  { as: "tutorial" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

// foreign key association for notification
db.notificationList.hasMany(
  db.notification,
  { as: "notifications" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }

);

//Addition from Julian:
db.notification.belongsTo(
  db.notificationList,
  {as: "notification_list"},
  {foreignKey: {allowNull: false}, onDelete: "CASCADE"}
)

// foreign key for notification list
// db.notificationList.belongsTo(
//   db.employee,
//   { as: "employee" },
//   { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
// );
// db.notificationList.hasMany(
//   db.department,
//   { as: "department" },
//   { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
// );

export default db;
