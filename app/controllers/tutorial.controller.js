import db  from "../models/index.js";
import logger from "../config/logger.js";

const Schedule = db.schedule;
const Op = db.Sequelize.Op;
const exports = {};
// Create and Save a new Schedule
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    logger.warn('Schedule creation attempt with empty title');
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  // Create a Schedule
  const schedule = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false,
    userId: req.body.userId,
  };
  
  logger.debug(`Creating schedule: ${schedule.title} for user: ${schedule.userId}`);
  
  // Save Schedule in the database
  Schedule.create(schedule)
    .then((data) => {
      logger.info(`Schedule created successfully: ${data.id} - ${data.title}`);
      res.send(data);
    })
    .catch((err) => {
      logger.error(`Error creating schedule: ${err.message}`);
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Schedule.",
      });
    });
};
// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  
  logger.debug(`Fetching all tutorials with condition: ${JSON.stringify(condition)}`);
  
  Schedule.findAll({ where: condition })
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

// Find a single Schedule with an id
exports.findAllForUser = (req, res) => {
  const userId = req.params.userId;
  Schedule.findAll({ where: { userId: userId } })
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
// Find a single Schedule with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  logger.debug(`Finding schedule with id: ${id}`);
  
  Schedule.findByPk(id)
    .then((data) => {
      if (data) {
        logger.info(`Schedule found: ${id}`);
        res.send(data);
      } else {
        logger.warn(`Schedule not found with id: ${id}`);
        res.status(404).send({
          message: `Cannot find Schedule with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      logger.error(`Error retrieving schedule ${id}: ${err.message}`);
      res.status(500).send({
        message: err.message || "Error retrieving Schedule with id=" + id,
      });
    });
};
// Update a Schedule by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Schedule.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Schedule was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Schedule with id=${id}. Maybe Schedule was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating Schedule with id=" + id,
      });
    });
};
// Delete a Schedule with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  logger.debug(`Attempting to delete schedule: ${id}`);
  
  Schedule.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        logger.info(`Schedule ${id} deleted successfully`);
        res.send({
          message: "Schedule was deleted successfully!",
        });
      } else {
        logger.warn(`Cannot delete schedule ${id} - not found`);
        res.send({
          message: `Cannot delete Schedule with id=${id}. Maybe Schedule was not found!`,
        });
      }
    })
    .catch((err) => {
      logger.error(`Error deleting schedule ${id}: ${err.message}`);
      res.status(500).send({
        message: err.message || "Could not delete Schedule with id=" + id,
      });
    });
};

export default exports;