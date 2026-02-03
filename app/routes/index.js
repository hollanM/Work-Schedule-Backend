import { Router } from "express";

import AuthRoutes from "./auth.routes.js";
import UserRoutes from "./user.routes.js";
import TutorialRoutes from "./tutorial.routes.js";
import LessonRoutes from "./lesson.routes.js";

//Julian's CHANGES START HERE
import ShiftRoutes from "./shift.routes.js";
import ShiftTaskListRoutes from "./shift_task_list.routes.js";
//Julian's CHANGES END HERE


const router = Router();

router.use("/", AuthRoutes);
router.use("/users", UserRoutes);
router.use("/tutorials", TutorialRoutes);
router.use("/tutorials", LessonRoutes);
router.use("/shifts", ShiftRoutes);
router.use("/shift_task_lists", ShiftTaskListRoutes);

export default router;
