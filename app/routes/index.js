import { Router } from "express";

import AuthRoutes from "./auth.routes.js";
import UserRoutes from "./user.routes.js";
import TutorialRoutes from "./tutorial.routes.js";
import LessonRoutes from "./lesson.routes.js";

//Julian's department routes changes start here.
import DepartmentScheduleRoutes from "./department_schedule.routes.js";
//Julian's department routes changes end here.


const router = Router();

router.use("/", AuthRoutes);
router.use("/users", UserRoutes);
router.use("/tutorials", TutorialRoutes);
router.use("/tutorials", LessonRoutes);

//Julian's department routes changes start here.
router.use("/department_schedules", DepartmentScheduleRoutes);
//Julian's department routes changes end here.

export default router;
