import db  from "../models/index.js";
import logger from "../config/logger.js";

const Employee_list = db.employee_list;
const Op = db.Sequelize.Op;
const exports = {};
// Create and Save a new Employee_list
exports.create = (req, res) => {
  // Validate request
  if (!req.body.employee_id) {
    logger.warn('Employee_list creation attempt with empty employee_id');
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  // Create a Employee_list
  const employee_list = {
    employee_id: req.body.employee_id, 
    Department: req.body.Department,
  };
  
  logger.debug(`Creating employee_list: ${employee_list.employee_id} for user: ${employee_list.userId}`);
  
  // Save Employee_list in the database
  Employee_list.create(employee_list)
    .then((data) => {
      logger.info(`Employee_list created successfully: ${data.id}`);
        //- ${data.employee_id}`);
      res.send(data);
    })
    .catch((err) => {
      logger.error(`Error creating employee_list: ${err.message}`);
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Employee_list.",
      });
    });
};
// Retrieve all Employee_lists from the database.
exports.findAll = (req, res) => {
  const employee_id  = req.query.employee_id ;
  var condition = employee_id  ? { employee_id : { [Op.like]: `%${employee_id}%` } } : null;
  
  logger.debug(`Fetching all employee_lists with condition: ${JSON.stringify(condition)}`);
  
  Employee_list.findAll({ where: condition })
    .then((data) => {
      logger.info(`Retrieved ${data.length} employee_lists`);
      res.send(data);
    })
    .catch((err) => {
      logger.error(`Error retrieving employee_lists: ${err.message}`);
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving employee_lists.",
      });
    });
};

/////////////////////////////////////Not sure if we need this.../////////////////////////////////////
// Find a single Employee_list with an id
exports.findAllForUser = (req, res) => {
  const userId = req.params.userId;
  Employee_list.findAll({ where: { userId: userId } })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Employee_lists for user with id=${userId}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Error retrieving Employee_lists for user with id=" + userId,
      });
    });
};
// Find a single Employee_list with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  logger.debug(`Finding employee_list with id: ${id}`);
  
  Employee_list.findByPk(id)
    .then((data) => {
      if (data) {
        logger.info(`Employee_list found: ${id}`);
        res.send(data);
      } else {
        logger.warn(`Employee_list not found with id: ${id}`);
        res.status(404).send({
          message: `Cannot find Employee_list with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      logger.error(`Error retrieving employee_list ${id}: ${err.message}`);
      res.status(500).send({
        message: err.message || "Error retrieving Employee_list with id=" + id,
      });
    });
};
// Update a Employee_list by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Employee_list.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Employee_list was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Employee_list with id=${id}. Maybe Employee_list was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating Employee_list with id=" + id,
      });
    });
};
// Delete a Employee_list with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  logger.debug(`Attempting to delete employee_list: ${id}`);
  
  Employee_list.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        logger.info(`Employee_list ${id} deleted successfully`);
        res.send({
          message: "Employee_list was deleted successfully!",
        });
      } else {
        logger.warn(`Cannot delete employee_list ${id} - not found`);
        res.send({
          message: `Cannot delete Employee_list with id=${id}. Maybe Employee_list was not found!`,
        });
      }
    })
    .catch((err) => {
      logger.error(`Error deleting employee_list ${id}: ${err.message}`);
      res.status(500).send({
        message: err.message || "Could not delete Employee_list with id=" + id,
      });
    });
};

export default exports;