import { Router } from "express";

import AuthRoutes from "./auth.routes.js";
import UserRoutes from "./user.routes.js";
import TutorialRoutes from "./tutorial.routes.js";
import LessonRoutes from "./lesson.routes.js";

//Julian's Availability Changes start here
import AvailabilityRoutes from "./availability.routes.js";
//Julian's Availability Changes end here




const router = Router();

router.use("/", AuthRoutes);
router.use("/users", UserRoutes);
router.use("/tutorials", TutorialRoutes);
router.use("/tutorials", LessonRoutes);

//Julian's Availability Changes start here
router.use("/availabilities", AvailabilityRoutes);
//Julian's Availability Changes end here


export default router;
