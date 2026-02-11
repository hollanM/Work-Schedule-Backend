import { Router } from "express";

import AuthRoutes from "./auth.routes.js";
import UserRoutes from "./user.routes.js";
import TutorialRoutes from "./tutorial.routes.js";
import LessonRoutes from "./lesson.routes.js";

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


const router = Router();

router.use("/", AuthRoutes);
router.use("/users", UserRoutes);
router.use("/tutorials", TutorialRoutes);
router.use("/tutorials", LessonRoutes);
router.use("/shifts", ShiftRoutes);
router.use("/shift_task_lists", ShiftTaskListRoutes);

//Julian's Availability Changes start here
router.use("/availabilities", AvailabilityRoutes);
//Julian's Availability Changes end here

router.use("/department_schedules", DepartmentScheduleRoutes);
router.use("/positions", PositionRoutes);
router.use("/qualifications", QualificationRoutes);
router.use("/qualification_lists", QualificationListRoutes);

//Julian's task route changes start here!
router.use("/tasks", TaskRoutes);
//Julian's task route changes end here!

export default router;
