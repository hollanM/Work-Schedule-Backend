  import manager_lists from "../controllers/manager_list.controller.js";
  import authenticate from "../authorization/authorization.js";
  import { Router } from "express";
  var router = Router()


  // Create a new Manager_List
  router.post("/", /*[authenticate],*/ manager_lists.create);

  // Retrieve all Tutorials
  router.get("/", /*[authenticate],*/ manager_lists.findAll);

  // Retrieve all Tutorials for user
  router.get("/userTut/:userId", [authenticate], manager_lists.findAllForUser);

  // Retrieve a single Manager_List with id
  router.get("/:id", /*[authenticate],*/ manager_lists.findOne);

  // Update a Manager_List with id
  router.put("/:id", /*[authenticate],*/ manager_lists.update);

  // Delete a Manager_List with id
  router.delete("/:id", /*[authenticate],*/ manager_lists.delete);


  export default router;

