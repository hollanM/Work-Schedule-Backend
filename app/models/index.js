import dbConfig from "../config/db.config.js";
import { Sequelize } from "sequelize";
import sequelize from "../config/sequelizeInstance.js";

// Models

import User from "./user.model.js";
import Session from "./session.model.js";
import Tutorial from "./tutorial.model.js";
import Lesson from "./lesson.model.js"; 


//Julian's Clock list and clock in out changes start here
import Clock_List from "./clock_list.model.js";
import Clock_In_Out from "./clock_in_out.model.js";
//Julian's Clock list and clock in out changes end here 


const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = User;
db.session = Session;
db.tutorial = Tutorial;
db.lesson = Lesson;

//Julian's Clock list and clock in out changes start here
db.clock_list = Clock_List;
db.clock_in_out = Clock_In_Out;
//Julian's Clock list and clock in out changes end here





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


//Julian's Clock list and clock in out foreign key associations start here
// Exercise 1 <- many ExerciseDay
Clock_List.hasMany(Clock_In_Out, {
  foreignKey: "clock_list_id",
  as: "clock_in_outs"
});

Clock_In_Out.belongsTo(Clock_List, {
  foreignKey: "clock_list_id",
  as: "clock_list"
});



export default db;
