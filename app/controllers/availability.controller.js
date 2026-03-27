import db  from "../models/index.js";
import logger from "../config/logger.js";

const Availability = db.availability;
const Op = db.Sequelize.Op;
const exports = {};
// Create and Save a new Availability
exports.create = (req, res) => {

  // Create a Availability
  const availability = {
    type: req.body.type,
    date_start_time_id: req.body.date_start_time_id,
    date_end_time_id: req.body.date_end_time_id,
    user_id: req.body.user_id,
  };
  
  logger.debug(`Creating availability: ${availability.type} for employee: ${availability.employee_id}`);
  
  // Save Availability in the database
  Availability.create(availability)
    .then((data) => {
      logger.info(`Availability created successfully: ${data.id} - ${data.title}`);
      res.send(data);
    })
    .catch((err) => {
      logger.error(`Error creating availability: ${err.message}`);
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Availability.",
      });
    });
};
// Retrieve all Availability from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  
  logger.debug(`Fetching all tutorials with condition: ${JSON.stringify(condition)}`);
  
  Availability.findAll({ where: condition })
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

// Find a single Availability with an id
exports.findAllForUser = (req, res) => {
  const userId = req.params.userId;
  Availability.findAll({ where: { userId: userId } })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Availability for user with id=${userId}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Error retrieving Availability for user with id=" + userId,
      });
    });
};
// Find a single Availability with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  logger.debug(`Finding availability with id: ${id}`);
  
  Availability.findByPk(id)
    .then((data) => {
      if (data) {
        logger.info(`Availability found: ${id}`);
        res.send(data);
      } else {
        logger.warn(`Availability not found with id: ${id}`);
        res.status(404).send({
          message: `Cannot find Availability with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      logger.error(`Error retrieving availability ${id}: ${err.message}`);
      res.status(500).send({
        message: err.message || "Error retrieving Availability with id=" + id,
      });
    });
};
// Update a Availability by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Availability.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Availability was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Availability with id=${id}. Maybe Availability was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating Availability with id=" + id,
      });
    });
};
// Delete a Availability with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  logger.debug(`Attempting to delete availability: ${id}`);
  
  Availability.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        logger.info(`Availability ${id} deleted successfully`);
        res.send({
          message: "Availability was deleted successfully!",
        });
      } else {
        logger.warn(`Cannot delete availability ${id} - not found`);
        res.send({
          message: `Cannot delete Availability with id=${id}. Maybe Availability was not found!`,
        });
      }
    })
    .catch((err) => {
      logger.error(`Error deleting availability ${id}: ${err.message}`);
      res.status(500).send({
        message: err.message || "Could not delete Availability with id=" + id,
      });
    });
};

export default exports;