import dbConfig from "../config/db.config.js";
import { Sequelize } from "sequelize";
import sequelize from "../config/sequelizeInstance.js";

// Models

import User from "./user.model.js";
import Session from "./session.model.js";
import Tutorial from "./tutorial.model.js";
import Lesson from "./lesson.model.js"; 
import Date_time from "./date_time.model.js"
import Employee from "./employee.model.js"; 
import Employee_list from "./employee_list.model.js"; 
import Shift from "./shift.model.js";
import Shift_Task_List from "./shift_task_list.model.js";

//Julian's Manager Setting's Changes Start here
import Manager_List from "./manager_list.model.js";
//Julian's Manager Setting's Changes End here

//Julian's Availability Changes start here
import Availability from "./availability.model.js";
//Julian's Availability Changes end here

import Department_Schedule from "./department_schedule.model.js";
import Position from "./position.model.js";
import Qualification_List from "./qualification_list.model.js";
import Qualification from "./qualification.model.js";

//Julian's Task Model Changes begin here
import Task from "./task.model.js";
//Julian's Task Model Changes end here

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
db.date_time = Date_time;
db.e = Tutorial;
db.lesson = Lesson;
db.employee = Employee;
db.employee_list = Employee_list;

//Julian's Task Model Changes begin here
db.task = Task;
//Julian's Task Model Changes end here
//Julian's CHANGES START HERE
db.shift = Shift;
db.shift_task_list = Shift_Task_List;
//Julian's CHANGES END HERE
//Julian's Availability Changes start here
db.availability = Availability;
//Julian's Availability Changes end here
db.department_schedule = Department_Schedule;
db.position = Position;
db.qualification_list = Qualification_List;
db.qualification = Qualification;

//Julian's Manager Setting's Changes Start here
db.manager_list = Manager_List;
//Julian's Manager Setting's Changes End here

db.clock_list = Clock_List;
db.clock_in_out = Clock_In_Out;




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


// Exercise 1 <- many ExerciseDay
Clock_List.hasMany(Clock_In_Out, {
  foreignKey: "clock_list_id",
  as: "clock_in_outs"
});

Clock_In_Out.belongsTo(Clock_List, {
  foreignKey: "clock_list_id",
  as: "clock_list"
});

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
//The associations for manager list
//(employee, and department) will need to go here
//so that the foreign keys in them work. 

//Julian's Task Model Changes begin here

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


//Julian's Availability Associations need to start here.
//this is for employee, and date time.
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
