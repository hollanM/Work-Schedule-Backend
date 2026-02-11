import { Router } from "express";

import AuthRoutes from "./auth.routes.js";
import UserRoutes from "./user.routes.js";
import TutorialRoutes from "./tutorial.routes.js";
import LessonRoutes from "./lesson.routes.js";

import PositionRoutes from "./position.routes.js";

import QualificationRoutes from "./qualification.routes.js";
import QualificationListRoutes from "./qualification_list.routes.js";

import WeeklyScheduleRoutes from "./weekly_schedule.routes.js";

const router = Router();

router.use("/", AuthRoutes);
router.use("/users", UserRoutes);
router.use("/tutorials", TutorialRoutes);
router.use("/tutorials", LessonRoutes);

router.use("/positions", PositionRoutes);

router.use("/qualifications", QualificationRoutes);
router.use("/qualification_lists", QualificationListRoutes);

router.use("/weekly_schedules", WeeklyScheduleRoutes);

export default router;
