import db  from "../models/index.js";
import logger from "../config/logger.js";

const Clock_List = db.clock_list;
const Op = db.Sequelize.Op;
const exports = {};
// Create and Save a new Clock_List
exports.create = (req, res) => {

  // Create a Clock_List
  const clock_list = {
    user_id: req.body.user_id,
    department_id: req.body.department_id,
  };
  
  logger.debug(`Creating clock_list...`);
  
  // Save Clock_List in the database
  Clock_List.create(clock_list)
    .then((data) => {
      logger.info(`Clock_List created successfully: ${data.id} - ${data.title}`);
      res.send(data);
    })
    .catch((err) => {
      logger.error(`Error creating clock_list: ${err.message}`);
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Clock_List.",
      });
    });
};
// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  
  logger.debug(`Fetching all tutorials with condition: ${JSON.stringify(condition)}`);
  
  Clock_List.findAll({ where: condition })
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

// Find a single Clock_List with an id
exports.findAllForUser = (req, res) => {
  const userId = req.params.userId;
  Clock_List.findAll({ where: { userId: userId } })
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
// Find a single Clock_List with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  logger.debug(`Finding clock_list with id: ${id}`);
  
  Clock_List.findByPk(id)
    .then((data) => {
      if (data) {
        logger.info(`Clock_List found: ${id}`);
        res.send(data);
      } else {
        logger.warn(`Clock_List not found with id: ${id}`);
        res.status(404).send({
          message: `Cannot find Clock_List with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      logger.error(`Error retrieving clock_list ${id}: ${err.message}`);
      res.status(500).send({
        message: err.message || "Error retrieving Clock_List with id=" + id,
      });
    });
};
// Update a Clock_List by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Clock_List.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Clock_List was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Clock_List with id=${id}. Maybe Clock_List was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating Clock_List with id=" + id,
      });
    });
};
// Delete a Clock_List with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  logger.debug(`Attempting to delete clock_list: ${id}`);
  
  Clock_List.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        logger.info(`Clock_List ${id} deleted successfully`);
        res.send({
          message: "Clock_List was deleted successfully!",
        });
      } else {
        logger.warn(`Cannot delete clock_list ${id} - not found`);
        res.send({
          message: `Cannot delete Clock_List with id=${id}. Maybe Clock_List was not found!`,
        });
      }
    })
    .catch((err) => {
      logger.error(`Error deleting clock_list ${id}: ${err.message}`);
      res.status(500).send({
        message: err.message || "Could not delete Clock_List with id=" + id,
      });
    });
};

export default exports;