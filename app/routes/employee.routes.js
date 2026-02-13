  import employees from "../controllers/employee.controller.js";
  import authenticate from "../authorization/authorization.js";
  import { Router } from "express";
  var router = Router()


  // Create a new Employee
  router.post("/", employees.create);
    //[authenticate], employees.create);

  // Retrieve all Employees
  router.get("/", employees.findAll);
    //[authenticate], employees.findAll);

  // Retrieve all Employees for user
  router.get("/userTut/:userId", employees.findAllForUser);
    //[authenticate], employees.findAllForUser);

  // Retrieve a single Employee with id
  router.get("/:id", employees.findOne);
    //[authenticate], employees.findOne);

  // Update a Employee with id
  router.put("/:id", employees.update);
    //[authenticate], employees.update);

  // Delete a Employee with id
  router.delete("/:id", employees.delete);
    //[authenticate], employees.delete);


  export default router;

