import dbConfig from "../config/db.config.js";
import { Sequelize } from "sequelize";
import sequelize from "../config/sequelizeInstance.js";

// Models

import User from "./user.model.js";
import Session from "./session.model.js";
import Tutorial from "./tutorial.model.js";
import Lesson from "./lesson.model.js"; 
import Department from "./department.model.js";


const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = User;
db.session = Session;
db.tutorial = Tutorial;
db.lesson = Lesson;
db.department = Department;

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

// foreign key for time_off
// db.department.belongsTo(
//   db.weekely_schedule,
//   { as: "weekely_schedule" },
//   { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
// );
// db.department.belongsTo(
//   db.position,
//   { as: "position" },
//   { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
// );
// db.department.belongsTo(
//   db.manager_list,
//   { as: "manager_list" },
//   { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
// );
// db.department.belongsTo(
//   db.employee_list,
//   { as: "employee_list" },
//   { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
// );
// db.department.belongsTo(
//   db.clock_list,
//   { as: "clock_list" },
//   { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
// );
// db.department.belongsTo(
//   db.shift,
//   { as: "shift" },
//   { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
// );
// db.department.belongsTo(
//   db.shift_task_list,
//   { as: "shift_task_list" },
//   { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
// );
// db.department.belongsTo(
//   db.notification_list,
//   { as: "notification_list" },
//   { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
// );
// db.department_schedule.belongsTo(
//   db.department,
//   { as: "department" },
//   { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
// );

export default db;
