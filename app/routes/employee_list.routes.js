  import employee_lists from "../controllers/employee_list.controller.js";
  import authenticate from "../authorization/authorization.js";
  import { Router } from "express";
  var router = Router()


  // Create a new Employee_list
  router.post("/",  employee_lists.create);
    //[authenticate], employee_lists.create);

  // Retrieve all Employee_lists
  router.get("/", employee_lists.findAll);
    //[authenticate], employee_lists.findAll);

  // Retrieve all Employee_lists for user
  router.get("/userTut/:userId", employee_lists.findAllForUser);
    //[authenticate], employee_lists.findAllForUser);

  // Retrieve a single Employee_list with id
  router.get("/:id",  employee_lists.findOne);
    //[authenticate], employee_lists.findOne);

  // Update a Employee_list with id
  router.put("/:id", employee_lists.update);
    //[authenticate], employee_lists.update);

  // Delete a Employee_list with id
  router.delete("/:id", employee_lists.delete);
    //[authenticate], employee_lists.delete);


  export default router;

