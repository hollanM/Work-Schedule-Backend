import db  from "../models/index.js";
import logger from "../config/logger.js";

const Employee = db.employee;
const Op = db.Sequelize.Op;
const exports = {};
// Create and Save a new Employee
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    logger.warn('Employee creation attempt with empty name');
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  // Create a Employee
  const employee = {
    name: req.body.name, 
    email: req.body.email, 
    phone_num: req.body.phone_num, 
    OC_id: req.body.OC_id, 
    pay_rate: req.body.pay_rate, 
    Clocked_in: req.body.Clocked_in ? req.body.Clocked_in : false, 
    has_qualification_list_id: req.body.has_qualification_list_id, 
    app_settings_id: req.body.app_settings_id, 
    preferred_work_time_id: req.body.preferred_work_time_id
  };
  
  logger.debug(`Creating employee: ${employee.name} `);
  //  for user: ${employee.userId}`);
  
  // Save Employee in the database
  Employee.create(employee)
    .then((data) => {
      logger.info(`Employee created successfully: ${data.id} - ${data.name}`);
      res.send(data);
    })
    .catch((err) => {
      logger.error(`Error creating employee: ${err.message}`);
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Employee.",
      });
    });
};
// Retrieve all Employees from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;
  
  logger.debug(`Fetching all employees with condition: ${JSON.stringify(condition)}`);
  
  Employee.findAll({ where: condition })
    .then((data) => {
      logger.info(`Retrieved ${data.length} employees`);
      res.send(data);
    })
    .catch((err) => {
      logger.error(`Error retrieving employees: ${err.message}`);
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving employees.",
      });
    });
};

// Find a single Employee with an id
exports.findAllForUser = (req, res) => {
  const userId = req.params.userId;
  Employee.findAll({ where: { userId: userId } })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Employees for user with id=${userId}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Error retrieving Employees for user with id=" + userId,
      });
    });
};
// Find a single Employee with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  logger.debug(`Finding employee with id: ${id}`);
  
  Employee.findByPk(id)
    .then((data) => {
      if (data) {
        logger.info(`Employee found: ${id}`);
        res.send(data);
      } else {
        logger.warn(`Employee not found with id: ${id}`);
        res.status(404).send({
          message: `Cannot find Employee with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      logger.error(`Error retrieving employee ${id}: ${err.message}`);
      res.status(500).send({
        message: err.message || "Error retrieving Employee with id=" + id,
      });
    });
};
// Update a Employee by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Employee.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Employee was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Employee with id=${id}. Maybe Employee was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating Employee with id=" + id,
      });
    });
};
// Delete a Employee with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  logger.debug(`Attempting to delete employee: ${id}`);
  
  Employee.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        logger.info(`Employee ${id} deleted successfully`);
        res.send({
          message: "Employee was deleted successfully!",
        });
      } else {
        logger.warn(`Cannot delete employee ${id} - not found`);
        res.send({
          message: `Cannot delete Employee with id=${id}. Maybe Employee was not found!`,
        });
      }
    })
    .catch((err) => {
      logger.error(`Error deleting employee ${id}: ${err.message}`);
      res.status(500).send({
        message: err.message || "Could not delete Employee with id=" + id,
      });
    });
};

export default exports;