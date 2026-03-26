import db  from "../models/index.js";
import logger from "../config/logger.js";

const Task = db.task;
const Op = db.Sequelize.Op;
const exports = {};
// Create and Save a new Task
exports.create = (req, res) => {

  // Create a Task
  const task = {
   shift_task_list_id: req.body.shift_task_list_id,
   status: req.body.status,
    description: req.body.description,
    name: req.body.name,
  };
  
  logger.debug(`Creating Task...`);
  
  // Save Task in the database
  Task.create(task)
    .then((data) => {
      logger.info(`Task created successfully: ${data.id} - ${data.title}`);
      res.send(data);
    })
    .catch((err) => {
      logger.error(`Error creating Task: ${err.message}`);
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Task.",
      });
    });
};
// Retrieve all Tasks from the database.
exports.findAll = (req, res) => {
  const TaskId = req.query.task_id;
  var condition = TaskId
    ? {
        TaskId: {
          [Op.like]: `%${TaskId}%`,
        },
      }
    : null;

  logger.debug(`Fetching all Tasks with condition: ${JSON.stringify(condition)}`);

  Task.findAll({ where: condition })
    .then((data) => {
      logger.info(`Retrieved ${data.length} Tasks`);
      res.send(data);
    })
    .catch((err) => {
      logger.error(`Error retrieving Tasks: ${err.message}`);
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Tasks.",
      });
    });
};
// Retrieve all Tasks for a tutorial from the database.

// Find a single Task with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  logger.debug(`Finding Task with id: ${id}`);
  
  Task.findByPk(id)
    .then((data) => {
      if (data) {
        logger.info(`Task found: ${id}`);
        res.send(data);
      } else {
        logger.warn(`Task not found with id: ${id}`);
        res.status(404).send({
          message: `Cannot find Task with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      logger.error(`Error retrieving Task ${id}: ${err.message}`);
      res.status(500).send({
        message: "Error retrieving Task with id=" + id,
      });
    });
};
// Update a Task by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  logger.debug(`Updating Task ${id} with data: ${JSON.stringify(req.body)}`);
  
  Task.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        logger.info(`Task ${id} updated successfully`);
        res.send({
          message: "Task was updated successfully.",
        });
      } else {
        logger.warn(`Failed to update Task ${id} - not found or empty body`);
        res.send({
          message: `Cannot update Task with id=${id}. Maybe Task was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      logger.error(`Error updating Task ${id}: ${err.message}`);
      res.status(500).send({
        message: "Error updating Task with id=" + id,
      });
    });
};
// Delete a Task with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  logger.debug(`Attempting to delete Task: ${id}`);
  
  Task.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        logger.info(`Task ${id} deleted successfully`);
        res.send({
          message: "Task was deleted successfully!",
        });
      } else {
        logger.warn(`Cannot delete Task ${id} - not found`);
        res.send({
          message: `Cannot delete Task with id=${id}. Maybe Task was not found!`,
        });
      }
    })
    .catch((err) => {
      logger.error(`Error deleting Task ${id}: ${err.message}`);
      res.status(500).send({
        message: "Could not delete Task with id=" + id,
      });
    });
};

// Find all published Tasks
exports.findAllPublished = (req, res) => {
  const TaskId = req.query.TaskId;

  Task.findAll({ where: { published: true } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Tasks.",
      });
    });
};

export default exports;
