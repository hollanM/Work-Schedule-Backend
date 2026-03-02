  import weekly_schedule from "../controllers/weekly_schedule.controller.js";
  import authenticate from "../authorization/authorization.js";
  import { Router } from "express";
  var router = Router()
//

  // Create a new weekly_schedule
  router.post("/", /*[authenticate],*/ weekly_schedule.create);

  // Retrieve all weekly_schedule
  router.get("/", /*[authenticate],*/ weekly_schedule.findAll);

  // Retrieve a single weekly_schedule with id
  router.get("/:id", /*[authenticate],*/ weekly_schedule.findOne);

  // Update a weekly_schedule with id
  router.put("/:id", /*[authenticate],*/ weekly_schedule.update);

  // Delete a weekly_schedule with id
  router.delete("/:id", /*[authenticate],*/ weekly_schedule.delete);


  export default router;