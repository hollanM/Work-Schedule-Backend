  import courses from "../controllers/course.controller.js";
  import authenticate from "../authorization/authorization.js";
  import { Router } from "express";
  var router = Router()


  // Create a new Clock_List
  router.post("/", /*[authenticate],*/ courses.create);

  // Retrieve all Tutorials
  router.get("/", /*[authenticate],*/ courses.findAll);


  // Retrieve a single Clock_List with id
  router.get("/:id", /*[authenticate],*/ courses.findOne);

  // Update a Clock_List with id
  router.put("/:id", /*[authenticate],*/ courses.update);

  // Delete a Clock_List with id
  router.delete("/:id", /*[authenticate],*/ courses.delete);


  export default router;