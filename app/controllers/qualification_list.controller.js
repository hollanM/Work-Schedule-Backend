import db  from "../models/index.js";
import logger from "../config/logger.js";

const Qualification_List = db.qualification_list;
const Op = db.Sequelize.Op;
const exports = {};
// Create and Save a new Qualification_List
exports.create = (req, res) => {
  // Create a Qualification_List
  const qualification_list = {
    qualification_description: req.body.qualification_description,
  };
  
  logger.debug(`Creating Qualification_List...`);
  
  // Save Qualification_List in the database
  Qualification_List.create(qualification_list)
    .then((data) => {
      logger.info(`Qualification_List created successfully: ${data.id} - ${data.title}`);
      res.send(data);
    })
    .catch((err) => {
      logger.error(`Error creating Qualification_List: ${err.message}`);
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Qualification_List.",
      });
    });
};
// Retrieve all Qualification_Lists from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  
  logger.debug(`Fetching all Qualification_Lists with condition: ${JSON.stringify(condition)}`);
  
  Qualification_List.findAll({ where: condition })
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

// Find a single Qualification_List with an id
exports.findAllForUser = (req, res) => {
  const userId = req.params.userId;
  Qualification_List.findAll({ where: { userId: userId } })
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
// Find a single Qualification_List with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  logger.debug(`Finding Qualification_List with id: ${id}`);
  
  Qualification_List.findByPk(id)
    .then((data) => {
      if (data) {
        logger.info(`Qualification_List found: ${id}`);
        res.send(data);
      } else {
        logger.warn(`Qualification_List not found with id: ${id}`);
        res.status(404).send({
          message: `Cannot find Qualification_List with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      logger.error(`Error retrieving Qualification_List ${id}: ${err.message}`);
      res.status(500).send({
        message: err.message || "Error retrieving Qualification_List with id=" + id,
      });
    });
};
// Update a Qualification_List by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Qualification_List.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Qualification_List was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Qualification_List with id=${id}. Maybe Qualification_List was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating Qualification_List with id=" + id,
      });
    });
};
// Delete a Qualification_List with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  logger.debug(`Attempting to delete Qualification_List: ${id}`);
  
  Qualification_List.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        logger.info(`Qualification_List ${id} deleted successfully`);
        res.send({
          message: "Qualification_List was deleted successfully!",
        });
      } else {
        logger.warn(`Cannot delete Qualification_List ${id} - not found`);
        res.send({
          message: `Cannot delete Qualification_List with id=${id}. Maybe Qualification_List was not found!`,
        });
      }
    })
    .catch((err) => {
      logger.error(`Error deleting Qualification_List ${id}: ${err.message}`);
      res.status(500).send({
        message: err.message || "Could not delete Qualification_List with id=" + id,
      });
    });
};

export default exports;