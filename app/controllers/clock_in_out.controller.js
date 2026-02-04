import db  from "../models/index.js";
import logger from "../config/logger.js";

const Clock_In_Out = db.clock_in_out;
const Op = db.Sequelize.Op;
const exports = {};
// Create and Save a new Clock_In_Out
exports.create = (req, res) => {

  // Create a Clock_In_Out
  const clock_in_out = {
    day: req.body.day,
    time: req.body.time,
    clock_list_id: req.body.clock_list_id,
  };
  
  logger.debug(`Creating clock_in_out table...`);
  
  // Save Clock_In_Out in the database
  Clock_In_Out.create(clock_in_out)
    .then((data) => {
      logger.info(`Clock_In_Out created successfully: ${data.id} - ${data.title}`);
      res.send(data);
    })
    .catch((err) => {
      logger.error(`Error creating clock_in_out: ${err.message}`);
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Clock_In_Out.",
      });
    });
};
// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  
  logger.debug(`Fetching all tutorials with condition: ${JSON.stringify(condition)}`);
  
  Clock_In_Out.findAll({ where: condition })
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

// Find a single Clock_In_Out with an id
exports.findAllForUser = (req, res) => {
  const userId = req.params.userId;
  Clock_In_Out.findAll({ where: { userId: userId } })
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
// Find a single Clock_In_Out with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  logger.debug(`Finding clock_in_out with id: ${id}`);
  
  Clock_In_Out.findByPk(id)
    .then((data) => {
      if (data) {
        logger.info(`Clock_In_Out found: ${id}`);
        res.send(data);
      } else {
        logger.warn(`Clock_In_Out not found with id: ${id}`);
        res.status(404).send({
          message: `Cannot find Clock_In_Out with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      logger.error(`Error retrieving clock_in_out ${id}: ${err.message}`);
      res.status(500).send({
        message: err.message || "Error retrieving Clock_In_Out with id=" + id,
      });
    });
};
// Update a Clock_In_Out by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Clock_In_Out.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Clock_In_Out was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Clock_In_Out with id=${id}. Maybe Clock_In_Out was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating Clock_In_Out with id=" + id,
      });
    });
};
// Delete a Clock_In_Out with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  logger.debug(`Attempting to delete clock_in_out: ${id}`);
  
  Clock_In_Out.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        logger.info(`Clock_In_Out ${id} deleted successfully`);
        res.send({
          message: "Clock_In_Out was deleted successfully!",
        });
      } else {
        logger.warn(`Cannot delete clock_in_out ${id} - not found`);
        res.send({
          message: `Cannot delete Clock_In_Out with id=${id}. Maybe Clock_In_Out was not found!`,
        });
      }
    })
    .catch((err) => {
      logger.error(`Error deleting clock_in_out ${id}: ${err.message}`);
      res.status(500).send({
        message: err.message || "Could not delete Clock_In_Out with id=" + id,
      });
    });
};

export default exports;