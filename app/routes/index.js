import { Router } from "express";

import AuthRoutes from "./auth.routes.js";
import UserRoutes from "./user.routes.js";
import TutorialRoutes from "./tutorial.routes.js";
import LessonRoutes from "./lesson.routes.js";
import Department from "./department.routes.js";
import Date_time from "./date_time.routes.js";
import ClockListRoutes from "./clock_list.routes.js";
import ClockInOutRoutes from "./clock_in_out.routes.js";

//Julian's task route changes start here!
import TaskRoutes from "./task.routes.js";
//Julian's task route changes end here!
//Julian's CHANGES START HERE
import ShiftRoutes from "./shift.routes.js";
import ShiftTaskListRoutes from "./shift_task_list.routes.js";
//Julian's CHANGES END HERE
//Julian's Availability Changes start here
import AvailabilityRoutes from "./availability.routes.js";
//Julian's Availability Changes end here

import DepartmentScheduleRoutes from "./department_schedule.routes.js";
import PositionRoutes from "./position.routes.js";
import QualificationRoutes from "./qualification.routes.js";
import QualificationListRoutes from "./qualification_list.routes.js";

import TimeOffRequestRoutes from "./time_off_request.routes.js";


import WeeklyScheduleRoutes from "./weekly_schedule.routes.js";
import NotificationRoutes from "./notification.routes.js";
import NotificationListRoutes from "./notification_list.routes.js";
import In_App_SettingsRoutes from "./in_app_settings.routes.js";


//jm course structure backend changes start here
import CourseRoutes from "./course.routes.js";
import Course_MeetRoutes from "./course_meet.routes.js";
import Student_Course_ListRoutes from "./student_course_list.routes.js";
import InstructorRoutes from "./instructor.routes.js";
import Instructor_ListRoutes from "./instructor_list.routes.js";
//jm course structure backend changes end here

const router = Router();

router.use("/", AuthRoutes);
router.use("/users", UserRoutes);
router.use("/tutorials", TutorialRoutes);
router.use("/tutorials", LessonRoutes);
router.use("/departments", Department);
router.use("/date_times", Date_time);
router.use("/shifts", ShiftRoutes);
router.use("/shift_task_lists", ShiftTaskListRoutes);

//Julian's Availability Changes start here
router.use("/availabilities", AvailabilityRoutes);
//Julian's Availability Changes end here

router.use("/department_schedules", DepartmentScheduleRoutes);
router.use("/positions", PositionRoutes);
router.use("/qualifications", QualificationRoutes);
router.use("/qualification_lists", QualificationListRoutes);
router.use("/weekly_schedules", WeeklyScheduleRoutes);
router.use("/time_off_requests", TimeOffRequestRoutes);


//Julian's task route changes start here!
router.use("/tasks", TaskRoutes);
//Julian's task route changes end here!


router.use("/clock_lists", ClockListRoutes);
router.use("/clock_in_outs", ClockInOutRoutes);
router.use("/notifications", NotificationRoutes);
router.use("/notification_lists", NotificationListRoutes);
router.use("/in_app_settings", In_App_SettingsRoutes);

router.use("/courses", CourseRoutes);
router.use("/course_meets", Course_MeetRoutes);
router.use("/student_course_lists", Student_Course_ListRoutes);
router.use("/instructors", InstructorRoutes);
router.use("/instructor_lists", Instructor_ListRoutes);

export default router;
