  import qualification_lists from "../controllers/qualification_list.controller.js";
  import authenticate from "../authorization/authorization.js";
  import { Router } from "express";
  var router = Router()


  // Create a new qualification_list
  router.post("/", /*[authenticate],*/ qualification_lists.create);

  // Retrieve all qualification_lists
  router.get("/", /*[authenticate],*/ qualification_lists.findAll);

  // Retrieve a single qualification_list with id
  router.get("/:id", /*[authenticate],*/ qualification_lists.findOne);

  // Update a qualification_list with id
  router.put("/:id", /*[authenticate],*/ qualification_lists.update);

  // Delete a qualification_list with id
  router.delete("/:id", /*[authenticate],*/ qualification_lists.delete);


  export default router;

