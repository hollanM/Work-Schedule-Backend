  import notification_list from "../controllers/notification_list.controller.js";
  import authenticate from "../authorization/authorization.js";
  import { Router } from "express";
  var router = Router()


  // Create a new Notification List
  router.post("/", [authenticate], notification_list.create);

  // Retrieve all Notification Lists
  router.get("/", [authenticate], notification_list.findAll);

  // Retrieve all Notification Lists for user
  router.get("/userTut/:userId", [authenticate], notification_list.findAllForUser);

  // Retrieve a single Notification List with id
  router.get("/:id", [authenticate], notification_list.findOne);

  // Update a Notification List with id
  router.put("/:id", [authenticate], notification_list.update);

  // Delete a Notification List with id
  router.delete("/:id", [authenticate], notification_list.delete);


  export default router;

