import db  from "../models/index.js";
import logger from "../config/logger.js";

const Qualification = db.qualification;
const Op = db.Sequelize.Op;
const exports = {};
// Create and Save a new Qualification
exports.create = (req, res) => {
  // Create a Qualification
  const qualification = {
    name: req.body.name,
    description: req.body.description,
    employee_id: req.body.employee_id,
    qualification_list_id: req.body.qualification_list_id,
  };
  
  logger.debug(`Creating Qualification...`);
  
  // Save Qualification in the database
  Qualification.create(qualification)
    .then((data) => {
      logger.info(`Qualification created successfully: ${data.id} - ${data.title}`);
      res.send(data);
    })
    .catch((err) => {
      logger.error(`Error creating Qualification: ${err.message}`);
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Qualification.",
      });
    });
};
// Retrieve all Qualifications from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  
  logger.debug(`Fetching all Qualifications with condition: ${JSON.stringify(condition)}`);
  
  Qualification.findAll({ where: condition })
    .then((data) => {
      logger.info(`Retrieved ${data.length} Qualifications`);
      res.send(data);
    })
    .catch((err) => {
      logger.error(`Error retrieving Qualifications: ${err.message}`);
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Qualifications.",
      });
    });
};

// Find a single Qualification with an id
exports.findAllForUser = (req, res) => {
  const userId = req.params.userId;
  Qualification.findAll({ where: { userId: userId } })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Qualifications for user with id=${userId}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Error retrieving Qualifications for user with id=" + userId,
      });
    });
};
// Find a single Qualification with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  logger.debug(`Finding Qualification with id: ${id}`);
  
  Qualification.findByPk(id)
    .then((data) => {
      if (data) {
        logger.info(`Qualification found: ${id}`);
        res.send(data);
      } else {
        logger.warn(`Qualification not found with id: ${id}`);
        res.status(404).send({
          message: `Cannot find Qualification with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      logger.error(`Error retrieving Qualification ${id}: ${err.message}`);
      res.status(500).send({
        message: err.message || "Error retrieving Qualification with id=" + id,
      });
    });
};
// Update a Qualification by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Qualification.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Qualification was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Qualification with id=${id}. Maybe Qualification was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating Qualification with id=" + id,
      });
    });
};
// Delete a Qualification with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  logger.debug(`Attempting to delete Qualification: ${id}`);
  
  Qualification.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        logger.info(`Qualification ${id} deleted successfully`);
        res.send({
          message: "Qualification was deleted successfully!",
        });
      } else {
        logger.warn(`Cannot delete Qualification ${id} - not found`);
        res.send({
          message: `Cannot delete Qualification with id=${id}. Maybe Qualification was not found!`,
        });
      }
    })
    .catch((err) => {
      logger.error(`Error deleting Qualification ${id}: ${err.message}`);
      res.status(500).send({
        message: err.message || "Could not delete Qualification with id=" + id,
      });
    });
};

export default exports;