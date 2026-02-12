  import qualifications from "../controllers/qualification.controller.js";
  import authenticate from "../authorization/authorization.js";
  import { Router } from "express";
  var router = Router()


  // Create a new qualification
  router.post("/", /*[authenticate],*/ qualifications.create);

  // Retrieve all qualifications
  router.get("/", /*[authenticate],*/ qualifications.findAll);

  router.get("/qualification_lists/:id", /*[authenticate],*/ qualifications.findAllForQualificationList);

  // Retrieve a single qualification with id
  router.get("/:id", /*[authenticate],*/ qualifications.findOne);

  // Update a qualification with id
  router.put("/:id", /*[authenticate],*/ qualifications.update);

  // Delete a qualification with id
  router.delete("/:id", /*[authenticate],*/ qualifications.delete);


  export default router;

