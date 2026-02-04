import { Router } from "express";

import AuthRoutes from "./auth.routes.js";
import UserRoutes from "./user.routes.js";
import TutorialRoutes from "./tutorial.routes.js";
import LessonRoutes from "./lesson.routes.js";

//Julian's qualification routes changes start here
import QualificationRoutes from "./qualification.routes.js";
import QualificationListRoutes from "./qualification_list.routes.js";
//Julian's qualification routes changes end here    



const router = Router();

router.use("/", AuthRoutes);
router.use("/users", UserRoutes);
router.use("/tutorials", TutorialRoutes);
router.use("/tutorials", LessonRoutes);

//Julian's qualification routes changes start here
router.use("/qualifications", QualificationRoutes);
router.use("/qualification_lists", QualificationListRoutes);
//Julian's qualification routes changes end here

export default router;
