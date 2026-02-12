import db  from "../models/index.js";
import logger from "../config/logger.js";

const Department_Schedule = db.department_schedule;
const Op = db.Sequelize.Op;
const exports = {};
// Create and Save a new Department_Schedule
exports.create = (req, res) => {
  // Create a Department_Schedule
  const department_schedule = {
    su_schedule: req.body.su_schedule,
    mo_schedule: req.body.mo_schedule,
    tu_schedule: req.body.tu_schedule,
    we_schedule: req.body.we_schedule,
    th_schedule: req.body.th_schedule,
    fr_schedule: req.body.fr_schedule,
    sa_schedule: req.body.sa_schedule,
  };
  
  logger.debug(`Creating department_schedule:...`);
  
  // Save Department_Schedule in the database
  Department_Schedule.create(department_schedule)
    .then((data) => {
      logger.info(`Department_Schedule created successfully: ${data.id}`);
      res.send(data);
    })
    .catch((err) => {
      logger.error(`Error creating department_schedule: ${err.message}`);
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Department_Schedule.",
      });
    });
};
// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  
  logger.debug(`Fetching all tutorials with condition: ${JSON.stringify(condition)}`);
  
  Department_Schedule.findAll({ where: condition })
    .then((data) => {
      logger.info(`Retrieved ${data.length} tutorials`);
      res.send(data);
    })
    .catch((err) => {
      logger.error(`Error retrieving tutorials: ${err.message}`);
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
};

// Find a single Department_Schedule with an id
exports.findAllForUser = (req, res) => {
  const userId = req.params.userId;
  Department_Schedule.findAll({ where: { userId: userId } })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Tutorials for user with id=${userId}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Error retrieving Tutorials for user with id=" + userId,
      });
    });
};
// Find a single Department_Schedule with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  logger.debug(`Finding department_schedule with id: ${id}`);
  
  Department_Schedule.findByPk(id)
    .then((data) => {
      if (data) {
        logger.info(`Department_Schedule found: ${id}`);
        res.send(data);
      } else {
        logger.warn(`Department_Schedule not found with id: ${id}`);
        res.status(404).send({
          message: `Cannot find Department_Schedule with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      logger.error(`Error retrieving department_schedule ${id}: ${err.message}`);
      res.status(500).send({
        message: err.message || "Error retrieving Department_Schedule with id=" + id,
      });
    });
};
// Update a Department_Schedule by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Department_Schedule.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Department_Schedule was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Department_Schedule with id=${id}. Maybe Department_Schedule was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating Department_Schedule with id=" + id,
      });
    });
};
// Delete a Department_Schedule with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  logger.debug(`Attempting to delete department_schedule: ${id}`);
  
  Department_Schedule.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        logger.info(`Department_Schedule ${id} deleted successfully`);
        res.send({
          message: "Department_Schedule was deleted successfully!",
        });
      } else {
        logger.warn(`Cannot delete department_schedule ${id} - not found`);
        res.send({
          message: `Cannot delete Department_Schedule with id=${id}. Maybe Department_Schedule was not found!`,
        });
      }
    })
    .catch((err) => {
      logger.error(`Error deleting department_schedule ${id}: ${err.message}`);
      res.status(500).send({
        message: err.message || "Could not delete Department_Schedule with id=" + id,
      });
    });
};

export default exports;