  import Date_time from "../controllers/date_time.controller.js";
  import authenticate from "../authorization/authorization.js";
  import { Router } from "express";
  var router = Router()


  // Create a new Date_time
  router.post("/", /*[authenticate],*/ Date_time.create);

  // Retrieve all Date_time
  router.get("/", /*[authenticate],*/ Date_time.findAll);

  // Retrieve a single Date_time with id
  router.get("/:id", /*[authenticate],*/ Date_time.findOne);

  // Update a Date_time with id
  router.put("/:id", /*[authenticate],*/ Date_time.update);

  // Delete a Date_time with id
  router.delete("/:id", /*[authenticate],*/ Date_time.delete);


  export default router;

