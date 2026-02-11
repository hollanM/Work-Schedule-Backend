import dbConfig from "../config/db.config.js";
import { Sequelize } from "sequelize";
import sequelize from "../config/sequelizeInstance.js";

// Models

import User from "./user.model.js";
import Session from "./session.model.js";
import Tutorial from "./tutorial.model.js";
import Lesson from "./lesson.model.js"; 

import Department_Schedule from "./department_schedule.model.js";
import Position from "./position.model.js";
import Qualification_List from "./qualification_list.model.js";
import Qualification from "./qualification.model.js";

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = User;
db.session = Session;
db.tutorial = Tutorial;
db.lesson = Lesson;

db.department_schedule = Department_Schedule;
db.position = Position;
db.qualification_list = Qualification_List;
db.qualification = Qualification;

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

//Associations for Department_Schedules (to date time) needs to go here. 

//position associations to qualification list, and department need to go here.
//I'm deciding to not make a skeleton for them yet, since I can't realistically
//test them here in this branch. 

Qualification.belongsTo(Qualification_List, {
  foreignKey: "qualification_list_id",
  as: "qualification_list",
});

Qualification_List.hasMany(Qualification, {
  foreignKey: "qualification_list_id",
  as: "qualifications",
});

export default db;
