import { Router } from "express";

import AuthRoutes from "./auth.routes.js";
import UserRoutes from "./user.routes.js";
import TutorialRoutes from "./tutorial.routes.js";
import LessonRoutes from "./lesson.routes.js";

//Juian's Manager List changes start here
import ManagerListRoutes from "./manager_list.routes.js";
//Julian's Manager List changes end here

const router = Router();

router.use("/", AuthRoutes);
router.use("/users", UserRoutes);
router.use("/tutorials", TutorialRoutes);
router.use("/tutorials", LessonRoutes);

//Julian's Manager List changes start here
router.use("/manager_lists", ManagerListRoutes);
//Julian's Manager List changes end here


export default router;
