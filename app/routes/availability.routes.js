  import availabilities from "../controllers/availability.controller.js";
  import authenticate from "../authorization/authorization.js";
  import { Router } from "express";
  var router = Router()


  // Create a new availability
  router.post("/", /*[authenticate],*/ availabilities.create);

  // Retrieve all availabilities
  router.get("/", /*[authenticate],*/ availabilities.findAll);

  // Retrieve all availabilities for user
  router.get("/userTut/:userId", /*[authenticate],*/ availabilities.findAllForUser);

  // Retrieve a single availability with id
  router.get("/:id", /*[authenticate],*/ availabilities.findOne);

  // Update a availability with id
  router.put("/:id", /*[authenticate],*/ availabilities.update);

  // Delete a availability with id
  router.delete("/:id", /*[authenticate],*/ availabilities.delete);


  export default router;

