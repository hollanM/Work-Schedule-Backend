  import time_off from "../controllers/time_off.controller.js";
  import authenticate from "../authorization/authorization.js";
  import { Router } from "express";
  var router = Router()


  // Create a new Tutorial
  router.post("/", /*[authenticate],*/ time_off.create);

  // Retrieve all time_off
  router.get("/", /*[authenticate],*/ time_off.findAll);

  // Retrieve all time_off for user
  router.get("/time_off/:time_off", /*[authenticate],*/ time_off.findAll);

  // Retrieve a single time_off with id
  router.get("/:id", /*[authenticate],*/ time_off.findOne);

  // Update a time_off with id
  router.put("/:id", /*[authenticate],*/ time_off.update);

  // Delete a time_off with id
  router.delete("/:id", /*[authenticate],*/ time_off.delete);


  export default router;

