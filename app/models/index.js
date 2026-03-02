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
import Employee from "./employee.model.js"; 
import Employee_List from "./employee_list.model.js"; 
import Weekly_Schedule from "./weekly_schedule.model.js";
import Shift from "./shift.model.js";
import Shift_Task_List from "./shift_task_list.model.js";

//Julian's Manager Setting's Changes Start here
import Manager_List from "./manager_list.model.js";
//Julian's Manager Setting's Changes End here

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
db.employee = Employee;
db.employee_list = Employee_List;
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

//Julian's Manager Setting's Changes Start here
db.manager_list = Manager_List;
//Julian's Manager Setting's Changes End here

db.clock_list = Clock_List;
db.clock_in_out = Clock_In_Out;

db.in_app_settings = In_App_Settings;




// foreign key for session

//Manager_List foreign key associations start here
Manager_List.belongsTo(Employee, { foreignKey: "employee_id", as: "employees" });
Manager_List.belongsTo(Department, { foreignKey: "department_id", as: "departments" });
//Manager_List foreign key associations end here

//Employee_list foreign key associations start here
Employee_List.belongsTo(Employee, { foreignKey: "employee_id", as: "employees" });
Employee_List.belongsTo(Department, { foreignKey: "department_id", as: "departments" });
//Employee_list foreign key associations end here

//Clock_In_Out foreign key associations start here
Clock_In_Out.belongsTo(Employee, { foreignKey: "employee_id", as: "employees" });
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
Department.hasMany(Employee_List, { foreignKey: "department_id", as: "employee_lists" });
Department.hasMany(Manager_List, { foreignKey: "department_id", as: "manager_lists" });
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
Shift.belongsTo(Employee, { foreignKey: "employee_id", as: "employees" });
Shift.belongsTo(Date_time, { foreignKey: "start_day_id", as: "start_date_times" });
Shift.belongsTo(Date_time, { foreignKey: "end_day_id", as: "end_date_times" });
Shift.belongsTo(Shift_Task_List, { foreignKey: "shift_task_list_id", as: "shift_task_lists" });
//Shift Associations end here

//Availability Associations start here
Availability.belongsTo(Employee, { foreignKey: "employee_id", as: "employees" });
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
NotificationList.belongsTo(Employee, { foreignKey: "employee_id", as: "employees" });
NotificationList.belongsTo(Department, { foreignKey: "department_id", as: "departments" });
NotificationList.hasMany(Notification, { foreignKey: "notification_list_id", as: "notifications" });
//Notification List Associations end here

//Qualification List Associations start here
  //Once again, this represents where qualification list is represented as a foreign key in that table. 
Qualification_List.hasMany(Position, { foreignKey: "qualification_list_id", as: "positions" });
Qualification_List.hasMany(Qualification, { foreignKey: "qualification_list_id", as: "qualifications" });
Qualification_List.belongsTo(Employee, { foreignKey: "employee_id", as: "employees" });
//Qualification List Associations end here

//Qualification Associations start here
Qualification.belongsTo(Employee, { foreignKey: "employee_id", as: "employees" });
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
Time_Off_Request.belongsTo(Employee, { foreignKey: "employee_id", as: "employees" });
Time_Off_Request.belongsTo(Date_time, { foreignKey: "start_time_id", as: "start_times" });
Time_Off_Request.belongsTo(Date_time, { foreignKey: "end_time_id", as: "end_times" });
//Time off request associations end here

//Employee Associations start here

  //All the things that use employee as a foreign key go here.
Employee.hasMany(Time_Off_Request, { foreignKey: "employee_id", as: "time_off_requests" });
Employee.hasMany(Availability, { foreignKey: "employee_id", as: "availabilities" });
Employee.hasMany(Shift, { foreignKey: "employee_id", as: "shifts" });
Employee.hasMany(Employee_List, { foreignKey: "employee_id", as: "employee_lists" });
Employee.hasMany(Manager_List, { foreignKey: "employee_id", as: "manager_lists" });
Employee.hasMany(NotificationList, { foreignKey: "employee_id", as: "notification_lists" });
Employee.hasMany(Qualification_List, { foreignKey: "employee_id", as: "qualification_lists" });
Employee.hasMany(Clock_In_Out, { foreignKey: "employee_id", as: "clock_in_outs" });
Employee.hasMany(In_App_Settings, { foreignKey: "employee_id", as: "in_app_settings" });
//Employee Associations end here

//In_App_Settings Associations start here
In_App_Settings.belongsTo(Employee, { foreignKey: "employee_id", as: "employees" });
//In_App_Settings Associations end here

export default db;
