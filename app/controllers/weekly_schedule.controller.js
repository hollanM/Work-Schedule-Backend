import db  from "../models/index.js";
import logger from "../config/logger.js";

const Weekly_Schedule = db.weekly_schedule;
const Op = db.Sequelize.Op;
const exports = {};
// Create and Save a new Weekly_Schedule
exports.create = (req, res) => {
  // Create a Weekly_Schedule
  const weekly_schedule =  {
    name: req.body.name,
    start_day_id: req.body.start_day_id,
    end_day_id: req.body.end_day_id,
    is_template: req.body.is_template,
    department_id: req.body.department_id,
  };
  
  logger.debug(`Creating Weekly_Schedule...`);
  
  // Save Weekly_Schedule in the database
  Weekly_Schedule.create(weekly_schedule)
    .then((data) => {
      logger.info(`Weekly_Schedule created successfully: ${data.id} - ${data.name}`);
      res.send(data);
    })
    .catch((err) => {
      logger.error(`Error creating Weekly_Schedule: ${err.message}`);
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Weekly_Schedule.",
      });
    });
};
// Retrieve all Qualification_Lists from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  
  logger.debug(`Fetching all Qualification_Lists with condition: ${JSON.stringify(condition)}`);
  
  Weekly_Schedule.findAll({ where: condition })
    .then((data) => {
      logger.info(`Retrieved ${data.length} Qualification_Lists`);
      res.send(data);
    })
    .catch((err) => {
      logger.error(`Error retrieving Qualification_Lists: ${err.message}`);
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Qualification_Lists.",
      });
    });
};

// Find a single Weekly_Schedule with an id
exports.findAllForUser = (req, res) => {
  const userId = req.params.userId;
  Weekly_Schedule.findAll({ where: { userId: userId } })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Qualification_Lists for user with id=${userId}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Error retrieving Qualification_Lists for user with id=" + userId,
      });
    });
};
// Find a single Weekly_Schedule with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  logger.debug(`Finding Weekly_Schedule with id: ${id}`);
  
  Weekly_Schedule.findByPk(id)
    .then((data) => {
      if (data) {
        logger.info(`Weekly_Schedule found: ${id}`);
        res.send(data);
      } else {
        logger.warn(`Weekly_Schedule not found with id: ${id}`);
        res.status(404).send({
          message: `Cannot find Weekly_Schedule with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      logger.error(`Error retrieving Weekly_Schedule ${id}: ${err.message}`);
      res.status(500).send({
        message: err.message || "Error retrieving Weekly_Schedule with id=" + id,
      });
    });
};
// Update a Weekly_Schedule by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Weekly_Schedule.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Weekly_Schedule was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Weekly_Schedule with id=${id}. Maybe Weekly_Schedule was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating Weekly_Schedule with id=" + id,
      });
    });
};
// Delete a Weekly_Schedule with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  logger.debug(`Attempting to delete Weekly_Schedule: ${id}`);
  
  Weekly_Schedule.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        logger.info(`Weekly_Schedule ${id} deleted successfully`);
        res.send({
          message: "Weekly_Schedule was deleted successfully!",
        });
      } else {
        logger.warn(`Cannot delete Weekly_Schedule ${id} - not found`);
        res.send({
          message: `Cannot delete Weekly_Schedule with id=${id}. Maybe Weekly_Schedule was not found!`,
        });
      }
    })
    .catch((err) => {
      logger.error(`Error deleting Weekly_Schedule ${id}: ${err.message}`);
      res.status(500).send({
        message: err.message || "Could not delete Weekly_Schedule with id=" + id,
      });
    });
};

export default exports;