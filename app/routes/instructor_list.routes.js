  import instructor_lists from "../controllers/instructor_list.controller.js";
  import authenticate from "../authorization/authorization.js";
  import { Router } from "express";
  var router = Router()


  // Create a new Clock_List
  router.post("/", /*[authenticate],*/ instructor_lists.create);

  // Retrieve all Tutorials
  router.get("/", /*[authenticate],*/ instructor_lists.findAll);


  // Retrieve a single Clock_List with id
  router.get("/:id", /*[authenticate],*/ instructor_lists.findOne);

  // Update a Clock_List with id
  router.put("/:id", /*[authenticate],*/ instructor_lists.update);

  // Delete a Clock_List with id
  router.delete("/:id", /*[authenticate],*/ instructor_lists.delete);


  export default router;