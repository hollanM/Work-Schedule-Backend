import { Router } from "express";

import AuthRoutes from "./auth.routes.js";
import UserRoutes from "./user.routes.js";
import TutorialRoutes from "./tutorial.routes.js";
import LessonRoutes from "./lesson.routes.js";
import EmployeeRoutes from "./employee.routes.js";
import EmployeeListRoutes from "./employee_list.routes.js";

// Samuel Harris Changes - 2/11/2026 @ 2:30 PM
// changed employeeList to employee_lists
const router = Router();

router.use("/", AuthRoutes);
router.use("/users", UserRoutes);
router.use("/tutorials", TutorialRoutes);
router.use("/tutorials", LessonRoutes);
router.use("/employees", EmployeeRoutes);
router.use("/employee_lists", EmployeeListRoutes);

export default router;
