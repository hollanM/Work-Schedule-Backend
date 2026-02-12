  import clock_in_outs from "../controllers/clock_in_out.controller.js";
  import authenticate from "../authorization/authorization.js";
  import { Router } from "express";
  var router = Router()


  // Create a new Clock_in_Out
  router.post("/", /*[authenticate],*/ clock_in_outs.create);

  // Retrieve all Clock_in_Outs
  router.get("/", /*[authenticate],*/ clock_in_outs.findAll);

  // Retrieve all Clock_in_Outs for user
  router.get("/userTut/:userId", /*[authenticate],*/ clock_in_outs.findAllForUser);

  // Retrieve a single Clock_in_Out with id
  router.get("/:id", /*[authenticate],*/ clock_in_outs.findOne);

  // Update a Clock_in_Out with id
  router.put("/:id", /*[authenticate],*/ clock_in_outs.update);

  // Delete a Clock_in_Out with id
  router.delete("/:id", /*[authenticate],*/ clock_in_outs.delete);


  export default router;

