  import department from "../controllers/department.controller.js";
  import authenticate from "../authorization/authorization.js";
  import { Router } from "express";
  var router = Router()


  // Create a new Tutorial
  router.post("/", /*[authenticate],*/ department.create);

  // Retrieve all time_off
  router.get("/", /*[authenticate],*/ department.findAll);

  // Retrieve all time_off for user
  router.get("/department/:department", /*[authenticate],*/ department.findAll);

  // Retrieve a single time_off with id
  router.get("/:id", /*[authenticate],*/ department.findOne);

  // Update a time_off with id
  router.put("/:id", /*[authenticate],*/ department.update);

  // Delete a time_off with id
  router.delete("/:id", /*[authenticate],*/ department.delete);


  export default router;

