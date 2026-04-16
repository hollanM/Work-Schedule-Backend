  import weekly_schedules from "../controllers/weekly_schedule.controller.js";
  import authenticate from "../authorization/authorization.js";
  import { Router } from "express";
  var router = Router()
//

  // Create a new weekly_schedule
  router.post("/", /*[authenticate],*/ weekly_schedules.create);

  // Retrieve all weekly_schedule
  router.get("/", /*[authenticate],*/ weekly_schedules.findAll);

  router.get("/users/:id", weekly_schedules.findAllForUser);

  // Retrieve a single weekly_schedule with id
  router.get("/:id", /*[authenticate],*/ weekly_schedules.findOne);
  

  // Update a weekly_schedule with id
  router.put("/:id", /*[authenticate],*/ weekly_schedules.update);

  // Delete a weekly_schedule with id
  router.delete("/:id", /*[authenticate],*/ weekly_schedules.delete);

  // Save currently viewed week as template
  router.post("/template/save", weekly_schedules.saveTemplate);

  // Apply template to a new week
  router.post("/template/apply", weekly_schedules.applyTemplate);

  export default router;