import db  from "../models/index.js";
import logger from "../config/logger.js";

const Position = db.position;
const Op = db.Sequelize.Op;
const exports = {};
// Create and Save a new Position
exports.create = (req, res) => {
 
  // Create a Position
  const position = {
    name: req.body.name,
    description: req.body.description,
    qualification_list_id: req.body.qualification_list_id,
    department_id: req.body.department_id,
  };
  
  logger.debug(`Creating Position...`);
  
  // Save Position in the database
  Position.create(position)
    .then((data) => {
      logger.info(`Position created successfully: ${data.id} - ${data.name}`);
      res.send(data);
    })
    .catch((err) => {
      logger.error(`Error creating tutorial: ${err.message}`);
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Position.",
      });
    });
};
// Retrieve all Positions from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  
  logger.debug(`Fetching all positions with condition: ${JSON.stringify(condition)}`);
  
  Position.findAll({ where: condition })
    .then((data) => {
      logger.info(`Retrieved ${data.length} positions`);
      res.send(data);
    })
    .catch((err) => {
      logger.error(`Error retrieving positions: ${err.message}`);
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving positions.",
      });
    });
};

// Find a single Position with an id
exports.findAllForUser = (req, res) => {
  const userId = req.params.userId;
  Position.findAll({ where: { userId: userId } })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Positions for user with id=${userId}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Error retrieving Positions for user with id=" + userId,
      });
    });
};
// Find a single Position with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  logger.debug(`Finding tutorial with id: ${id}`);
  
  Position.findByPk(id)
    .then((data) => {
      if (data) {
        logger.info(`Position found: ${id}`);
        res.send(data);
      } else {
        logger.warn(`Position not found with id: ${id}`);
        res.status(404).send({
          message: `Cannot find Position with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      logger.error(`Error retrieving tutorial ${id}: ${err.message}`);
      res.status(500).send({
        message: err.message || "Error retrieving Position with id=" + id,
      });
    });
};
// Update a Position by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Position.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Position was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Position with id=${id}. Maybe Position was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating Position with id=" + id,
      });
    });
};
// Delete a Position with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  logger.debug(`Attempting to delete tutorial: ${id}`);
  
  Position.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        logger.info(`Position ${id} deleted successfully`);
        res.send({
          message: "Position was deleted successfully!",
        });
      } else {
        logger.warn(`Cannot delete tutorial ${id} - not found`);
        res.send({
          message: `Cannot delete Position with id=${id}. Maybe Position was not found!`,
        });
      }
    })
    .catch((err) => {
      logger.error(`Error deleting tutorial ${id}: ${err.message}`);
      res.status(500).send({
        message: err.message || "Could not delete Position with id=" + id,
      });
    });
};

export default exports;