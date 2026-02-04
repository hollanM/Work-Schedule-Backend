import { Router } from "express";

import AuthRoutes from "./auth.routes.js";
import UserRoutes from "./user.routes.js";
import TutorialRoutes from "./tutorial.routes.js";
import LessonRoutes from "./lesson.routes.js";

//Julian's task route changes start here!
import TaskRoutes from "./task.routes.js";
//Julian's task route changes end here!


const router = Router();

router.use("/", AuthRoutes);
router.use("/users", UserRoutes);
router.use("/tutorials", TutorialRoutes);
router.use("/tutorials", LessonRoutes);

//Julian's task route changes start here!
router.use("/tasks", TaskRoutes);
//Julian's task route changes end here!

export default router;
