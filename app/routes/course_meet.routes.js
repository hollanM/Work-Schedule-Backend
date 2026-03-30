import course_meets from "../controllers/course_meet.controller.js";
  import authenticate from "../authorization/authorization.js";
  import { Router } from "express";
  var router = Router()


  // Create a new Clock_List
  router.post("/", /*[authenticate],*/ course_meets.create);

  // Retrieve all Tutorials
  router.get("/", /*[authenticate],*/ course_meets.findAll);


  // Retrieve a single Clock_List with id
  router.get("/:id", /*[authenticate],*/ course_meets.findOne);

  // Update a Clock_List with id
  router.put("/:id", /*[authenticate],*/ course_meets.update);

  // Delete a Clock_List with id
  router.delete("/:id", /*[authenticate],*/ course_meets.delete);


  export default router;