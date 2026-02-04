  import clock_lists from "../controllers/clock_list.controller.js";
  import authenticate from "../authorization/authorization.js";
  import { Router } from "express";
  var router = Router()


  // Create a new Clock_List
  router.post("/", /*[authenticate],*/ clock_lists.create);

  // Retrieve all Tutorials
  router.get("/", /*[authenticate],*/ clock_lists.findAll);

  // Retrieve all Tutorials for user
  router.get("/userTut/:userId", /*[authenticate],*/ clock_lists.findAllForUser);

  // Retrieve a single Clock_List with id
  router.get("/:id", /*[authenticate],*/ clock_lists.findOne);

  // Update a Clock_List with id
  router.put("/:id", /*[authenticate],*/ clock_lists.update);

  // Delete a Clock_List with id
  router.delete("/:id", /*[authenticate],*/ clock_lists.delete);


  export default router;

