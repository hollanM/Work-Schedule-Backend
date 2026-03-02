  import time_off_request from "../controllers/time_off_request.controller.js";
  import authenticate from "../authorization/authorization.js";
  import { Router } from "express";
  var router = Router()


  // Create a new Tutorial
  router.post("/", /*[authenticate],*/ time_off_request.create);

  // Retrieve all time_off
  router.get("/", /*[authenticate],*/ time_off_request.findAll);

  // Retrieve all time_off for user
  router.get("/time_off/:time_off", /*[authenticate],*/ time_off_request.findAll);

  // Retrieve a single time_off with id
  router.get("/:id", /*[authenticate],*/ time_off_request  .findOne);

  // Update a time_off with id
  router.put("/:id", /*[authenticate],*/ time_off_request.update);

  // Delete a time_off with id
  router.delete("/:id", /*[authenticate],*/ time_off_request.delete);


  export default router;