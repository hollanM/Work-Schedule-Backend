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
import Employee_list from "./employee_list.model.js"; 
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
db.employee_list = Employee_list;
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




// foreign key for session

export default db;
