import { Router } from "express";

import AuthRoutes from "./auth.routes.js";
import UserRoutes from "./user.routes.js";
import TutorialRoutes from "./tutorial.routes.js";
import LessonRoutes from "./lesson.routes.js";

//Julian's Clock list and clock in out routes start here
import ClockListRoutes from "./clock_list.routes.js";
import ClockInOutRoutes from "./clock_in_out.routes.js";
//Julian's Clock list and clock in out routes end here  


const router = Router();

router.use("/", AuthRoutes);
router.use("/users", UserRoutes);
router.use("/tutorials", TutorialRoutes);
router.use("/tutorials", LessonRoutes);

//Julian's Clock list and clock in out routes start here
router.use("/clock_lists", ClockListRoutes);
router.use("/clock_in_outs", ClockInOutRoutes);
//Julian's Clock list and clock in out routes end here  

export default router;
