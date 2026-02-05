import db  from "../models/index.js";
import logger from "../config/logger.js";

const Department = db.department;
const Op = db.Sequelize.Op;
const exports = {};

// Create and Save a new Department
exports.create = (req, res) => {
  // Validate request
  // if (!req.body.Department || !req.body.Department) {
  //   logger.warn('Department creation attempt with empty employee ID or department ID');
  //   res.status(400).send({
  //     message: "Department content can not be empty!",
  //   });
  //   return;
  // }
  // Create a Department
  const department = {
    name: req.body.name ? req.body.name : null,
    department_schedule: req.body.department_schedule ? req.body.department_schedule : null,
    break_time_allotted: req.body.break_time_allotted ? req.body.break_time_allotted : null,
  };
  logger.debug(department.body);
  
  logger.debug(`Creating Department: ${Department.body}`);
  
  // Save Department in the database
  Department.create(department)
    .then((data) => {
      logger.info(`Department created successfully: ${data.id} - ${Department.name} - ${Department.department_schedule} - ${Department.break_time_allotted}`);
      res.send(data);
    })
    .catch((err) => {
      logger.error(`Error creating Department: ${err.message}`);
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Department.",
      });
    });
};
// Retrieve all Departments from the database.
exports.findAll = (req, res) => {
  const id = req.query.id;
  var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;
  
  logger.debug(`Fetching all Departments with condition: ${JSON.stringify(condition)}`);
  
  Department.findAll({ where: condition })
    .then((data) => {
      logger.info(`Retrieved ${data.length} Departments`);
      res.send(data);
    })
    .catch((err) => {
      logger.error(`Error retrieving Departments: ${err.message}`);
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Departments.",
      });
    });
};

// // Find a single Department with an id    //not used currently but we might find a use for it
// exports.findAllForUser = (req, res) => {
//   const userId = req.params.userId;
//   Department.findAll({ where: { userId: userId } })
//     .then((data) => {
//       if (data) {
//         res.send(data);
//       } else {
//         res.status(404).send({
//           message: `Cannot find Departments for user with id=${userId}.`,
//         });
//       }
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message:
//           err.message ||
//           "Error retrieving Departments for user with id=" + userId,
//       });
//     });
// };

// Find a single Department with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  logger.debug(`Finding Department with id: ${id}`);
  
  Department.findByPk(id)
    .then((data) => {
      if (data) {
        logger.info(`Department found: ${id}`);
        res.send(data);
      } else {
        logger.warn(`Department not found with id: ${id}`);
        res.status(404).send({
          message: `Cannot find Department with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      logger.error(`Error retrieving Department ${id}: ${err.message}`);
      res.status(500).send({
        message: err.message || "Error retrieving Department with id=" + id,
      });
    });
};
// Update a Department by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Department.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Department was updated successfully.",
        });
      } else {
        res.send({
          message: `${Department.body}Cannot update Department with id=${id}. Maybe Department was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating Department with id=" + id,
      });
    });
};
// Delete a Department with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  logger.debug(`Attempting to delete Department: ${id}`);
  
  Department.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        logger.info(`Department ${id} deleted successfully`);
        res.send({
          message: "Department was deleted successfully!",
        });
      } else {
        logger.warn(`Cannot delete Department ${id} - not found`);
        res.send({
          message: `Cannot delete Department with id=${id}. Maybe Department was not found!`,
        });
      }
    })
    .catch((err) => {
      logger.error(`Error deleting Department ${id}: ${err.message}`);
      res.status(500).send({
        message: err.message || "Could not delete Department with id=" + id,
      });
    });
};

export default exports;