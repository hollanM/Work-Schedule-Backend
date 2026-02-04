import db  from "../models/index.js";
import logger from "../config/logger.js";

const NotificationList = db.notificationList;
const Op = db.Sequelize.Op;
const exports = {};
// Create and Save a new NotificationList
exports.create = (req, res) => {
  // Create a NotificationList
  // Create a NotificationList
  const notification_list = {
    employee_id: req.body.employee_id || null,
    department_id: req.body.department_id || null,
  };
  
  logger.debug(`Creating notification_list: ${JSON.stringify(notification_list)}`);
  
  // Save NotificationList in the database
  NotificationList.create(notification_list)
    .then((data) => {
      logger.info(`NotificationList created successfully: ${data.id} - ${data.title}`);
      res.send(data);
    })
    .catch((err) => {
      logger.error(`Error creating notification_list: ${err.message}`);
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the NotificationList.",
      });
    });
};
// Retrieve all NotificationLists from the database.
exports.findAll = (req, res) => {
  const notification_listId = req.query.notification_listId;
  var condition = notification_listId
    ? {
        notification_listId: {
          [Op.like]: `%${notification_listId}%`,
        },
      }
    : null;

  logger.debug(`Fetching all notification_lists with condition: ${JSON.stringify(condition)}`);

  NotificationList.findAll({ where: condition })
    .then((data) => {
      logger.info(`Retrieved ${data.length} notification_lists`);
      res.send(data);
    })
    .catch((err) => {
      logger.error(`Error retrieving notification_lists: ${err.message}`);
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving notification_lists.",
      });
    });
};
// Retrieve all NotificationLists for a tutorial from the database.
// TODO: Do we need findAllForTutorial?
exports.findAllForTutorial = (req, res) => {
  const tutorialId = req.params.tutorialId;

  NotificationList.findAll({ where: { tutorialId: tutorialId } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving notification_lists.",
      });
    });
};
// Retrieve all NotificationLists for a user from the database.
exports.findAllForUser = (req, res) => {
  const userId = req.params.userId;

  NotificationList.findAll({ where: { userId: userId } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving notification_lists.",
      });
    });
};
// Find a single NotificationList with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  logger.debug(`Finding notification_list with id: ${id}`);
  
  NotificationList.findByPk(id)
    .then((data) => {
      if (data) {
        logger.info(`NotificationList found: ${id}`);
        res.send(data);
      } else {
        logger.warn(`NotificationList not found with id: ${id}`);
        res.status(404).send({
          message: `Cannot find NotificationList with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      logger.error(`Error retrieving notification_list ${id}: ${err.message}`);
      res.status(500).send({
        message: "Error retrieving NotificationList with id=" + id,
      });
    });
};
// Update a NotificationList by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  logger.debug(`Updating notification_list ${id} with data: ${JSON.stringify(req.body)}`);
  
  NotificationList.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        logger.info(`NotificationList ${id} updated successfully`);
        res.send({
          message: "NotificationList was updated successfully.",
        });
      } else {
        logger.warn(`Failed to update notification_list ${id} - not found or empty body`);
        res.send({
          message: `Cannot update NotificationList with id=${id}. Maybe NotificationList was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      logger.error(`Error updating notification_list ${id}: ${err.message}`);
      res.status(500).send({
        message: "Error updating NotificationList with id=" + id,
      });
    });
};
// Delete a NotificationList with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  logger.debug(`Attempting to delete notification_list: ${id}`);
  
  NotificationList.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        logger.info(`NotificationList ${id} deleted successfully`);
        res.send({
          message: "NotificationList was deleted successfully!",
        });
      } else {
        logger.warn(`Cannot delete notification_list ${id} - not found`);
        res.send({
          message: `Cannot delete NotificationList with id=${id}. Maybe NotificationList was not found!`,
        });
      }
    })
    .catch((err) => {
      logger.error(`Error deleting notification_list ${id}: ${err.message}`);
      res.status(500).send({
        message: "Could not delete NotificationList with id=" + id,
      });
    });
};

// Find all published NotificationLists
exports.findAllPublished = (req, res) => {
  const notification_listId = req.query.notification_listId;

  NotificationList.findAll({ where: { published: true } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving notification_lists.",
      });
    });
};

export default exports;
