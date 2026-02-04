import db  from "../models/index.js";
import logger from "../config/logger.js";

const Notification = db.notification;
const Op = db.Sequelize.Op;
const exports = {};
// Create and Save a new Notification
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    logger.warn('Notification creation attempt with empty title');
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a Notification
  const notification = {
    notificationListId: req.body.notificationListId || req.body.notificationList_id || req.params.notificationListId,
    userId: req.body.userId || null,
    title: req.body.title,
    description: req.body.description,
    to: req.body.to,
    type: req.body.type,
    is_read: req.body.is_read === "true" || req.body.is_read === true ? true : false,
    date_time_sent: req.body.date_time_sent || null,
  };

  logger.debug(`Creating notification: ${notification.title} for list: ${notification.notificationListId}`);
  
  // Save Notification in the database
  Notification.create(notification)
    .then((data) => {
      logger.info(`Notification created successfully: ${data.id} - ${data.title}`);
      res.send(data);
    })
    .catch((err) => {
      logger.error(`Error creating notification: ${err.message}`);
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Notification.",
      });
    });
};
// Retrieve all Notifications from the database.
exports.findAll = (req, res) => {
  const notificationId = req.query.notificationId;
  var condition = notificationId
    ? {
        notificationId: {
          [Op.like]: `%${notificationId}%`,
        },
      }
    : null;

  logger.debug(`Fetching all notifications with condition: ${JSON.stringify(condition)}`);

  Notification.findAll({ where: condition })
    .then((data) => {
      logger.info(`Retrieved ${data.length} notifications`);
      res.send(data);
    })
    .catch((err) => {
      logger.error(`Error retrieving notifications: ${err.message}`);
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving notifications.",
      });
    });
};
// Retrieve all Notifications for a tutorial from the database.
// TODO: Do we need findAllForTutorial?
exports.findAllForTutorial = (req, res) => {
  const tutorialId = req.params.tutorialId;

  Notification.findAll({ where: { tutorialId: tutorialId } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving notifications.",
      });
    });
};
// Retrieve all Notifications for a user from the database.
exports.findAllForUser = (req, res) => {
  const userId = req.params.userId;

  Notification.findAll({ where: { userId: userId } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving notifications.",
      });
    });
};
// Find a single Notification with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  logger.debug(`Finding notification with id: ${id}`);
  
  Notification.findByPk(id)
    .then((data) => {
      if (data) {
        logger.info(`Notification found: ${id}`);
        res.send(data);
      } else {
        logger.warn(`Notification not found with id: ${id}`);
        res.status(404).send({
          message: `Cannot find Notification with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      logger.error(`Error retrieving notification ${id}: ${err.message}`);
      res.status(500).send({
        message: "Error retrieving Notification with id=" + id,
      });
    });
};
// Update a Notification by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  logger.debug(`Updating notification ${id} with data: ${JSON.stringify(req.body)}`);
  
  Notification.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        logger.info(`Notification ${id} updated successfully`);
        res.send({
          message: "Notification was updated successfully.",
        });
      } else {
        logger.warn(`Failed to update notification ${id} - not found or empty body`);
        res.send({
          message: `Cannot update Notification with id=${id}. Maybe Notification was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      logger.error(`Error updating notification ${id}: ${err.message}`);
      res.status(500).send({
        message: "Error updating Notification with id=" + id,
      });
    });
};
// Delete a Notification with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  logger.debug(`Attempting to delete notification: ${id}`);
  
  Notification.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        logger.info(`Notification ${id} deleted successfully`);
        res.send({
          message: "Notification was deleted successfully!",
        });
      } else {
        logger.warn(`Cannot delete notification ${id} - not found`);
        res.send({
          message: `Cannot delete Notification with id=${id}. Maybe Notification was not found!`,
        });
      }
    })
    .catch((err) => {
      logger.error(`Error deleting notification ${id}: ${err.message}`);
      res.status(500).send({
        message: "Could not delete Notification with id=" + id,
      });
    });
};

// Find all published Notifications
exports.findAllPublished = (req, res) => {
  const notificationId = req.query.notificationId;

  Notification.findAll({ where: { published: true } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving notifications.",
      });
    });
};

export default exports;
