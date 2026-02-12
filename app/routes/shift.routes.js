  import shifts from "../controllers/shift.controller.js";
  import authenticate from "../authorization/authorization.js";
  import { Router } from "express";
  var router = Router()


  // Create a new Tutorial
  router.post("/", /*[authenticate],*/ shifts.create);

  // Retrieve all shifts
  router.get("/", /*[authenticate],*/ shifts.findAll);


  // Retrieve a single Tutorial with id
  router.get("/:id", /*[authenticate],*/ shifts.findOne);

  // Update a Tutorial with id
  router.put("/:id", /*[authenticate],*/ shifts.update);

  // Delete a Tutorial with id
  router.delete("/:id", /*[authenticate],*/ shifts.delete);


  export default router;

