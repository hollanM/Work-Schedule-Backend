  import weekly_schedules from "../controllers/weekly_schedules.controller.js";
  import authenticate from "../authorization/authorization.js";
  import { Router } from "express";
  var router = Router()
//

  // Create a new weekly_schedules
  router.post("/", /*[authenticate],*/ weekly_schedules.create);

  // Retrieve all weekly_schedules
  router.get("/", /*[authenticate],*/ weekly_schedules.findAll);

  // Retrieve a single weekly_schedules with id
  router.get("/:id", /*[authenticate],*/ weekly_schedules.findOne);

  // Update a weekly_schedules with id
  router.put("/:id", /*[authenticate],*/ weekly_schedules.update);

  // Delete a weekly_schedules with id
  router.delete("/:id", /*[authenticate],*/ weekly_schedules.delete);


  export default router;