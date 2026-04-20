  import weekly_schedules from "../controllers/weekly_schedule.controller.js";
  import authenticate from "../authorization/authorization.js";
  import { Router } from "express";
  var router = Router()
//

  // Create a new weekly_schedules
  router.post("/", /*[authenticate],*/ weekly_schedules.create);

  // Retrieve all weekly_schedules
  router.get("/", /*[authenticate],*/ weekly_schedules.findAll);

  //weekly schedules for user even though it is only one for each manager
  router.get("/users/:id", weekly_schedules.findAllForUser); 

  // Retrieve a single weekly_schedules with id
  router.get("/:id", /*[authenticate],*/ weekly_schedules.findOne);

  // Update a weekly_schedules with id
  router.put("/:id", /*[authenticate],*/ weekly_schedules.update);

  // Delete a weekly_schedules with id
  router.delete("/:id", /*[authenticate],*/ weekly_schedules.delete);

  
  // Save weekly template
router.post("/template/save", weekly_schedules.saveTemplate);

// Apply weekly template
router.post("/template/apply", weekly_schedules.applyTemplate);


  export default router;