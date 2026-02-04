import dbConfig from "../config/db.config.js";
import { Sequelize } from "sequelize";
import sequelize from "../config/sequelizeInstance.js";

// Models

import User from "./user.model.js";
import Session from "./session.model.js";
import Tutorial from "./tutorial.model.js";
import Lesson from "./lesson.model.js"; 
import Date_time from "./date_time.model.js"


const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = User;
db.session = Session;
db.tutorial = Tutorial;
db.lesson = Lesson;
db.date_time = Date_time;

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

// foreign key for date_time //to be implemented when these tables start existing
// db.date_time.belongsTo(
//   db.weekely_schedule,
//   { as: "weekely_schedule" },
//   { foreignKey: { allowNull: true }, onDelete: "CASCADE" }
// );
// db.date_time.belongsTo(
//   db.department_schedule,
//   { as: "department_schedule" },
//   { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
// );
// db.date_time.belongsTo(
//   db.shift,
//   { as: "shift" },
//   { foreignKey: { allowNull: true }, onDelete: "CASCADE" }
// );
// db.date_time.belongsTo(
//   db.availability,
//   { as: "availability" },
//   { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
// );
// db.date_time.belongsTo(
//   db.time_off_request,
//   { as: "time_off_request" },
//   { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
// );
export default db;
