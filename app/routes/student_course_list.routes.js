  import student_course_lists from "../controllers/student_course_list.controller.js";
  import authenticate from "../authorization/authorization.js";
  import { Router } from "express";
  var router = Router()


  // Create a new Clock_List
  router.post("/", /*[authenticate],*/ student_course_lists.create);

  // Retrieve all Tutorials
  router.get("/", /*[authenticate],*/ student_course_lists.findAll);

  // Retrieve a single Clock_List with id
  router.get("/:id", /*[authenticate],*/ student_course_lists.findOne);

  // Update a Clock_List with id
  router.put("/:id", /*[authenticate],*/ student_course_lists.update);

  // Delete a Clock_List with id
  router.delete("/:id", /*[authenticate],*/ student_course_lists.delete);


  export default router;