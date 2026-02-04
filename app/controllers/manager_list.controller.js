import db  from "../models/index.js";
import logger from "../config/logger.js";

const Manager_List = db.manager_list;
const Op = db.Sequelize.Op;
const exports = {};
// Create and Save a new Manager_List
exports.create = (req, res) => {
  // Create a Manager_List
  const manager_list = {
    employee_id: req.body.employee_id,
    department_id: req.body.department_id,
  };
  
  logger.debug(`Creating Manager List...`);
  
  // Save Manager_List in the database
  Manager_List.create(manager_list)
    .then((data) => {
      logger.info(`Manager_List created successfully: ${data.id} - ${data.title}`);
      res.send(data);
    })
    .catch((err) => {
      logger.error(`Error creating tutorial: ${err.message}`);
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Manager_List.",
      });
    });
};
// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  
  logger.debug(`Fetching all tutorials with condition: ${JSON.stringify(condition)}`);
  
  Manager_List.findAll({ where: condition })
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

// Find a single Manager_List with an id
exports.findAllForUser = (req, res) => {
  const userId = req.params.userId;
  Manager_List.findAll({ where: { userId: userId } })
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
// Find a single Manager_List with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  logger.debug(`Finding tutorial with id: ${id}`);
  
  Manager_List.findByPk(id)
    .then((data) => {
      if (data) {
        logger.info(`Manager_List found: ${id}`);
        res.send(data);
      } else {
        logger.warn(`Manager_List not found with id: ${id}`);
        res.status(404).send({
          message: `Cannot find Manager_List with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      logger.error(`Error retrieving tutorial ${id}: ${err.message}`);
      res.status(500).send({
        message: err.message || "Error retrieving Manager_List with id=" + id,
      });
    });
};
// Update a Manager_List by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Manager_List.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Manager_List was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Manager_List with id=${id}. Maybe Manager_List was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating Manager_List with id=" + id,
      });
    });
};
// Delete a Manager_List with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  logger.debug(`Attempting to delete tutorial: ${id}`);
  
  Manager_List.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        logger.info(`Manager_List ${id} deleted successfully`);
        res.send({
          message: "Manager_List was deleted successfully!",
        });
      } else {
        logger.warn(`Cannot delete tutorial ${id} - not found`);
        res.send({
          message: `Cannot delete Manager_List with id=${id}. Maybe Manager_List was not found!`,
        });
      }
    })
    .catch((err) => {
      logger.error(`Error deleting tutorial ${id}: ${err.message}`);
      res.status(500).send({
        message: err.message || "Could not delete Manager_List with id=" + id,
      });
    });
};

export default exports;