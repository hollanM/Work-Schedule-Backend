  import tutorials from "../controllers/schedule.controller.js";
  import authenticate from "../authorization/authorization.js";
  import { Router } from "express";
  var router = Router()


  // Create a new Schedule
  router.post("/", [authenticate], tutorials.create);

  // Retrieve all Tutorials
  router.get("/", [authenticate], tutorials.findAll);

  // Retrieve all Tutorials for user
  router.get("/userTut/:userId", [authenticate], tutorials.findAllForUser);

  // Retrieve a single Schedule with id
  router.get("/:id", [authenticate], tutorials.findOne);

  // Update a Schedule with id
  router.put("/:id", [authenticate], tutorials.update);

  // Delete a Schedule with id
  router.delete("/:id", [authenticate], tutorials.delete);


  export default router;

