  import department_schedules from "../controllers/department_schedule.controller.js";
  import authenticate from "../authorization/authorization.js";
  import { Router } from "express";
  var router = Router()


  // Create a new Department_Schedule
  router.post("/", /*[authenticate],*/ department_schedules.create);

  // Retrieve all Department_Schedules
  router.get("/", /*[authenticate],*/ department_schedules.findAll);

  // Retrieve all Department_Schedules for user
  router.get("/userTut/:userId", /*[authenticate],*/ department_schedules.findAllForUser);

  // Retrieve a single Department_Schedule with id
  router.get("/:id", /*[authenticate],*/ department_schedules.findOne);

  // Update a Department_Schedule with id
  router.put("/:id", /*[authenticate],*/ department_schedules.update);

  // Delete a Department_Schedule with id
  router.delete("/:id", /*[authenticate],*/ department_schedules.delete);


  export default router;

