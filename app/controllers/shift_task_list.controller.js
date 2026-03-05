import db  from "../models/index.js";
import logger from "../config/logger.js";

const Shift_Task_List = db.shift_task_list;
const Op = db.Sequelize.Op;
const exports = {};
// Create and Save a new Shift_Task_List
exports.create = (req, res) => {

  // Create a Shift_Task_List
  const shift_task_list = {
    //please tell me how to turn suggestions off :(
    department_id: req.body.department_id,
    name: req.body.name || "",
  };
  
  logger.debug(`Creating Shift_Task_List...`);
  
  // Save Shift_Task_List in the database
  Shift_Task_List.create(shift_task_list)
    .then((data) => {
      logger.info(`Shift_Task_List created successfully: ${data.id} - ${data.title}`);
      res.send(data);
    })
    .catch((err) => {
      logger.error(`Error creating Shift_Task_List: ${err.message}`);
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Shift_Task_List.",
      });
    });
};
// Retrieve all Shift_Task_Lists from the database.
exports.findAll = (req, res) => {
  const Shift_Task_ListId = req.query.shift_task_list_id;
  var condition = Shift_Task_ListId
    ? {
        Shift_Task_ListId: {
          [Op.like]: `%${Shift_Task_ListId}%`,
        },
      }
    : null;

  logger.debug(`Fetching all Shift_Task_Lists with condition: ${JSON.stringify(condition)}`);

  Shift_Task_List.findAll({ where: condition })
    .then((data) => {
      logger.info(`Retrieved ${data.length} Shift_Task_Lists`);
      res.send(data);
    })
    .catch((err) => {
      logger.error(`Error retrieving Shift_Task_Lists: ${err.message}`);
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Shift_Task_Lists.",
      });
    });
};
// Retrieve all Shift_Task_Lists for a tutorial from the database.

// Find a single Shift_Task_List with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  logger.debug(`Finding Shift_Task_List with id: ${id}`);
  
  Shift_Task_List.findByPk(id)
    .then((data) => {
      if (data) {
        logger.info(`Shift_Task_List found: ${id}`);
        res.send(data);
      } else {
        logger.warn(`Shift_Task_List not found with id: ${id}`);
        res.status(404).send({
          message: `Cannot find Shift_Task_List with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      logger.error(`Error retrieving Shift_Task_List ${id}: ${err.message}`);
      res.status(500).send({
        message: "Error retrieving Shift_Task_List with id=" + id,
      });
    });
};
// Update a Shift_Task_List by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  logger.debug(`Updating Shift_Task_List ${id} with data: ${JSON.stringify(req.body)}`);
  
  Shift_Task_List.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        logger.info(`Shift_Task_List ${id} updated successfully`);
        res.send({
          message: "Shift_Task_List was updated successfully.",
        });
      } else {
        logger.warn(`Failed to update Shift_Task_List ${id} - not found or empty body`);
        res.send({
          message: `Cannot update Shift_Task_List with id=${id}. Maybe Shift_Task_List was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      logger.error(`Error updating Shift_Task_List ${id}: ${err.message}`);
      res.status(500).send({
        message: "Error updating Shift_Task_List with id=" + id,
      });
    });
};
// Delete a Shift_Task_List with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  logger.debug(`Attempting to delete Shift_Task_List: ${id}`);
  
  Shift_Task_List.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        logger.info(`Shift_Task_List ${id} deleted successfully`);
        res.send({
          message: "Shift_Task_List was deleted successfully!",
        });
      } else {
        logger.warn(`Cannot delete Shift_Task_List ${id} - not found`);
        res.send({
          message: `Cannot delete Shift_Task_List with id=${id}. Maybe Shift_Task_List was not found!`,
        });
      }
    })
    .catch((err) => {
      logger.error(`Error deleting Shift_Task_List ${id}: ${err.message}`);
      res.status(500).send({
        message: "Could not delete Shift_Task_List with id=" + id,
      });
    });
};

// Find all published Shift_Task_Lists

export default exports;
