  import notification from "../controllers/notification.controller.js";
  import authenticate from "../authorization/authorization.js";
  import { Router } from "express";
  var router = Router()

    // Create a new Notification
  router.post("/", notification.create);

  // Retrieve all Notifications
  router.get("/", notification.findAll);

  // Retrieve all Notifications for user
  router.get("/userTut/:userId", notification.findAllForUser);

  // Retrieve a single Tutorial with id
  router.get("/:id", notification.findOne);

  // Update a Tutorial with id
  router.put("/:id", notification.update);

  // Delete a Tutorial with id
  router.delete("/:id", notification.delete);

  // // Create a new Notification
  // router.post("/", [authenticate], notification.create);

  // // Retrieve all Notifications
  // router.get("/", [authenticate], notification.findAll);

  // // Retrieve all Notifications for user
  // router.get("/userTut/:userId", [authenticate], notification.findAllForUser);

  // // Retrieve a single Tutorial with id
  // router.get("/:id", [authenticate], notification.findOne);

  // // Update a Tutorial with id
  // router.put("/:id", [authenticate], notification.update);

  // // Delete a Tutorial with id
  // router.delete("/:id", [authenticate], notification.delete);


  export default router;

