  import tasks from "../controllers/task.controller.js";
  import authenticate from "../authorization/authorization.js";
  import { Router } from "express";
  var router = Router()


  // Create a new Tutorial
  router.post("/", /*[authenticate],*/ tasks.create);

  // Retrieve all tasks
  router.get("/", /*[authenticate],*/ tasks.findAll);

  // Retrieve a single task with id
  router.get("/:id", /*[authenticate],*/ tasks.findOne);

  // Update a task with id
  router.put("/:id", /*[authenticate],*/ tasks.update);

  // Delete a task with id
  router.delete("/:id", /*[authenticate],*/ tasks.delete);


  export default router;

