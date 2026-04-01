import instructors from "../controllers/instructor.controller.js";
  import authenticate from "../authorization/authorization.js";
  import { Router } from "express";
  var router = Router()


  // Create a new Clock_List
  router.post("/", /*[authenticate],*/ instructors.create);

  // Retrieve all Tutorials
  router.get("/", /*[authenticate],*/ instructors.findAll);


  // Retrieve a single Clock_List with id
  router.get("/:id", /*[authenticate],*/ instructors.findOne);

  // Update a Clock_List with id
  router.put("/:id", /*[authenticate],*/ instructors.update);

  // Delete a Clock_List with id
  router.delete("/:id", /*[authenticate],*/ instructors.delete);


  export default router;