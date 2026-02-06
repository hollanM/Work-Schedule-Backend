  import in_app_settings from "../controllers/in_app_settings.controller.js";
  import authenticate from "../authorization/authorization.js";
  import { Router } from "express";
  var router = Router()


  // Create a new Tutorial
  router.post("/", /*[authenticate],*/ in_app_settings.create);

  // Retrieve all time_off
  router.get("/", /*[authenticate],*/ in_app_settings.findAll);

  // Retrieve all time_off for user
  router.get("/in_app_settings/:in_app_setting", /*[authenticate],*/ in_app_settings.findAll);

  // Retrieve a single time_off with id
  router.get("/:id", /*[authenticate],*/ in_app_settings.findOne);

  // Update a time_off with id
  router.put("/:id", /*[authenticate],*/ in_app_settings.update);

  // Delete a time_off with id
  router.delete("/:id", /*[authenticate],*/ in_app_settings.delete);


  export default router;

