  import shift_task_lists from "../controllers/shift_task_list.controller.js";
  import authenticate from "../authorization/authorization.js";
  import { Router } from "express";
  var router = Router()


  // Create a new Tutorial
  router.post("/", /*[authenticate],*/ shift_task_lists.create);

  // Retrieve all shift_task_lists
  router.get("/", /*[authenticate],*/ shift_task_lists.findAll);


  // Retrieve a single Tutorial with id
  router.get("/:id", /*[authenticate],*/ shift_task_lists.findOne);

  // Update a Tutorial with id
  router.put("/:id", /*[authenticate],*/ shift_task_lists.update);

  // Delete a Tutorial with id
  router.delete("/:id", /*[authenticate],*/ shift_task_lists.delete);


  export default router;

