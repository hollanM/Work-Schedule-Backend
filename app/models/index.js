import dbConfig from "../config/db.config.js";
import { Sequelize } from "sequelize";
import sequelize from "../config/sequelizeInstance.js";

// Models

import User from "./user.model.js";
import Session from "./session.model.js";
import Tutorial from "./tutorial.model.js";
import Lesson from "./lesson.model.js"; 
import Department_Schedule from "./department_schedule.model.js";
import Department from "./department.model.js";
import Notification from "./notification.model.js";
import NotificationList from "./notification_list.model.js"; 
import Time_Off_Request from "./time_off_request.model.js";
import Date_time from "./date_time.model.js"
import Weekly_Schedule from "./weekly_schedule.model.js";
import Shift from "./shift.model.js";
import Shift_Task_List from "./shift_task_list.model.js";
//Julian's Availability Changes start here
import Availability from "./availability.model.js";
//Julian's Availability Changes end here


import Position from "./position.model.js";
import Qualification_List from "./qualification_list.model.js";
import Qualification from "./qualification.model.js";

//Julian's Task Model Changes begin here
import Task from "./task.model.js";
//Julian's Task Model Changes end here

//Julian's Clock list and clock in out changes start here
import Clock_List from "./clock_list.model.js";
import Clock_In_Out from "./clock_in_out.model.js";
import In_App_Settings from "./in_app_settings.model.js";
//Julian's Clock list and clock in out changes end here 


const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = User;
db.session = Session;
db.tutorial = Tutorial;
db.lesson = Lesson;
db.date_time = Date_time;
db.weekly_schedule = Weekly_Schedule;
db.department_schedule = Department_Schedule;
db.department = Department;
db.notification = Notification;
db.notification_list = NotificationList;

db.e = Tutorial;
db.lesson = Lesson;
db.time_off_request = Time_Off_Request;

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

db.position = Position;
db.qualification_list = Qualification_List;
db.qualification = Qualification;


db.clock_list = Clock_List;
db.clock_in_out = Clock_In_Out;

db.in_app_settings = In_App_Settings;




// foreign key for session

//Clock_In_Out foreign key associations start here
Clock_In_Out.belongsTo(User, { foreignKey: "user_id", as: "users" });
Clock_In_Out.belongsTo(Department, { foreignKey: "department_id", as: "departments" });
//Clock_In_Out foreign key associations end here  


//Weekly_Schedule foreign key associations start here
Weekly_Schedule.belongsTo(Date_time, { foreignKey: "start_day_id", as: "start_date_times" });
Weekly_Schedule.belongsTo(Date_time, { foreignKey: "end_day_id", as: "end_date_times" });
Weekly_Schedule.belongsTo(Department, { foreignKey: "department_id", as: "departments" });
//Weekly_Schedule foreign key associations end here

//Department Schedule Associations start here
Department_Schedule.belongsTo(Date_time, { foreignKey: "su_schedule", as: "su_date_times" });
Department_Schedule.belongsTo(Date_time, { foreignKey: "mo_schedule", as: "mo_date_times" });
Department_Schedule.belongsTo(Date_time, { foreignKey: "tu_schedule", as: "tu_date_times" });
Department_Schedule.belongsTo(Date_time, { foreignKey: "we_schedule", as: "we_date_times" });
Department_Schedule.belongsTo(Date_time, { foreignKey: "th_schedule", as: "th_date_times" });
Department_Schedule.belongsTo(Date_time, { foreignKey: "fr_schedule", as: "fr_date_times" });
Department_Schedule.belongsTo(Date_time, { foreignKey: "sa_schedule", as: "sa_date_times" });
Department_Schedule.belongsTo(Department, { foreignKey: "department_id", as: "departments" });
//Department Schedule Associations end here

//Department Associations start here
//this reflects who owns what.
Department.hasMany(User, { foreignKey: "department_id", as: "users" });
Department.hasMany(Department_Schedule, { foreignKey: "department_id", as: "department_schedules" });
Department.hasMany(Weekly_Schedule, { foreignKey: "department_id", as: "weekly_schedules" });
Department.hasMany(Clock_In_Out, { foreignKey: "department_id", as: "clock_in_outs" });
Department.hasMany(Position, { foreignKey: "department_id", as: "positions" });
Department.hasMany(Shift, { foreignKey: "department_id", as: "shifts" });
Department.hasMany(Shift_Task_List, { foreignKey: "department_id", as: "shift_task_lists" });
//Department Associations end here

//Position Associations start here
Position.belongsTo(Department, { foreignKey: "department_id", as: "departments" });
Position.belongsTo(Qualification_List, { foreignKey: "qualification_list_id", as: "qualification_lists" });
//Position Associations end here

//Shift Associations start here
Shift.belongsTo(Department, { foreignKey: "department_id", as: "departments" });  
Shift.belongsTo(Position, { foreignKey: "position_id", as: "positions" });
Shift.belongsTo(Weekly_Schedule, { foreignKey: "weekly_schedule_id", as: "weekly_schedules" });
Shift.belongsTo(User, { foreignKey: "user_id", as: "users" });
Shift.belongsTo(Date_time, { foreignKey: "start_day_id", as: "start_date_times" });
Shift.belongsTo(Date_time, { foreignKey: "end_day_id", as: "end_date_times" });
Shift.belongsTo(Shift_Task_List, { foreignKey: "shift_task_list_id", as: "shift_task_lists" });
Shift.belongsTo(Qualification_List, { foreignKey: "qualification_list_id", as: "qualification_lists" });
//Shift Associations end here

//Availability Associations start here
Availability.belongsTo(User, { foreignKey: "user_id", as: "users" });
Availability.belongsTo(Date_time, { foreignKey: "start_day_id", as: "start_date_times" });
Availability.belongsTo(Date_time, { foreignKey: "end_day_id", as: "end_date_times" });
//Availability Associations end here

//Task Associations start here
Task.belongsTo(Shift_Task_List, { foreignKey: "shift_task_list_id", as: "shift_task_lists" });
//Task Associations end here

//Shift_Task_List Associations start here
Shift_Task_List.hasMany(Task, { foreignKey: "shift_task_list_id", as: "tasks" });
Shift_Task_List.hasMany(Shift, { foreignKey: "shift_task_list_id", as: "shifts" });
Shift_Task_List.belongsTo(Department, { foreignKey: "department_id", as: "departments" });
//Shift_Task_List Associations end here

//Notification Associations start here
Notification.belongsTo(NotificationList, { foreignKey: "notification_list_id", as: "notification_lists" });
//Notification Associations end here

//Notification List Associations start here
NotificationList.belongsTo(User, { foreignKey: "user_id", as: "users" });
NotificationList.belongsTo(Department, { foreignKey: "department_id", as: "departments" });
NotificationList.hasMany(Notification, { foreignKey: "notification_list_id", as: "notifications" });
//Notification List Associations end here

//Qualification List Associations start here
  //Once again, this represents where qualification list is represented as a foreign key in that table. 
Qualification_List.hasMany(Position, { foreignKey: "qualification_list_id", as: "positions" });
Qualification_List.hasMany(Qualification, { foreignKey: "qualification_list_id", as: "qualifications" });
Qualification_List.hasMany(Shift, { foreignKey: "qualification_list_id", as: "shifts" });
Qualification_List.belongsTo(User, { foreignKey: "user_id", as: "users" });
//Qualification List Associations end here

//Qualification Associations start here
Qualification.belongsTo(User, { foreignKey: "user_id", as: "users" });
Qualification.belongsTo(Qualification_List, { foreignKey: "qualification_list_id", as: "qualification_lists" });
//Qualification Associations end here

//Date_Time Associations start here
Date_time.hasMany(Shift, { foreignKey: "start_day_id", as: "start_day_times" });
Date_time.hasMany(Shift, { foreignKey: "end_day_id", as: "end_day_times" });
Date_time.hasMany(Department_Schedule, { foreignKey: "su_schedule", as: "su_schedule_times" });
Date_time.hasMany(Department_Schedule, { foreignKey: "mo_schedule", as: "mo_schedule_times" });
Date_time.hasMany(Department_Schedule, { foreignKey: "tu_schedule", as: "tu_schedule_times" });
Date_time.hasMany(Department_Schedule, { foreignKey: "we_schedule", as: "we_schedule_times" });
Date_time.hasMany(Department_Schedule, { foreignKey: "th_schedule", as: "th_schedule_times" });
Date_time.hasMany(Department_Schedule, { foreignKey: "fr_schedule", as: "fr_schedule_times" });
Date_time.hasMany(Department_Schedule, { foreignKey: "sa_schedule", as: "sa_schedule_times" });
Date_time.hasMany(Availability, { foreignKey: "start_day_id", as: "availability_start_times" });
Date_time.hasMany(Availability, { foreignKey: "end_day_id", as: "availability_end_times" });
Date_time.hasMany(Weekly_Schedule, { foreignKey: "start_day_id", as: "weekly_schedule_start_times" });
Date_time.hasMany(Weekly_Schedule, { foreignKey: "end_day_id", as: "weekly_schedule_end_times" });
//Date_Time Associations end here


//Time off request associations start here
Time_Off_Request.belongsTo(User, { foreignKey: "user_id", as: "users" });
Time_Off_Request.belongsTo(Date_time, { foreignKey: "start_time_id", as: "start_times" });
Time_Off_Request.belongsTo(Date_time, { foreignKey: "end_time_id", as: "end_times" });
//Time off request associations end here

//User Associations start here

  //All the things that use User as a foreign key go here.
User.hasMany(Time_Off_Request, { foreignKey: "user_id", as: "time_off_requests" });
User.hasMany(Availability, { foreignKey: "user_id", as: "availabilities" });
User.hasMany(Shift, { foreignKey: "user_id", as: "shifts" });
User.hasMany(NotificationList, { foreignKey: "user_id", as: "notification_lists" });
User.hasMany(Qualification_List, { foreignKey: "user_id", as: "qualification_lists" });
User.hasMany(Clock_List, { foreignKey: "user_id", as: "clock_lists" });
User.hasMany(In_App_Settings, { foreignKey: "user_id", as: "in_app_settings" });
//User Associations end here

//In_App_Settings Associations start here
In_App_Settings.belongsTo(User, { foreignKey: "user_id", as: "users" });
//In_App_Settings Associations end here

export default db;
