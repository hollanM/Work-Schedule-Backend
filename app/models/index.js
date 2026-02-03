import dbConfig from "../config/db.config.js";
import { Sequelize } from "sequelize";
import sequelize from "../config/sequelizeInstance.js";

// Models

import User from "./user.model.js";
import Session from "./session.model.js";
import Tutorial from "./tutorial.model.js";
import Lesson from "./lesson.model.js"; 
import Shift from "./shift.js";
import Shift_Task_List from "./shift_task_list.js";
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = User;
db.session = Session;
db.tutorial = Tutorial;
db.lesson = Lesson;

//Julian's CHANGES START HERE
db.shift = Shift;
db.shift_task_list = Shift_Task_List;
//Julian's CHANGES END HERE

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


//Julian's CHANGES START HERE
//Foreign key assocations for Shift, Shift_Task_List, and Task models will be under here...
//1-1 relationship for shift, and shift task lists (AI keeps trying to write lines for me and I hate it)
Shift.belongsTo(Shift_Task_List, {
  foreignKey: "shift_task_list_id",
  as: "shift_task_list",
});

Shift_Task_List.hasOne(Shift, {
  foreignKey: "shift_task_list_id",
  as: "shift",
});


//Julian's CHANGES END HERE



export default db;
