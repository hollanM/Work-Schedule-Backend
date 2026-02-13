import db  from "../models/index.js";
import logger from "../config/logger.js";

const Date_Time = db.date_time;
const Op = db.Sequelize.Op;
const exports = {};
// Create and Save a new Date_Time
exports.create = (req, res) => {
  // Validate request
  // if (!req.body.first_Date_Time || !req.body.second_Date_Time) {
  //   logger.warn('Date_Time creation attempt with empty date/times, at least one must be present');
  //   res.status(400).send({
  //     message: "Date_Time content can not be empty!",
  //   });
  //   return;
  // }
  // Create a Date_Time
  const date_time = {
    first_date_time: req.body.first_date_time ? req.body.first_date_time : null,
    second_date_time: req.body.second_date_time ? req.body.second_date_time : null,
  };
  
  logger.debug(`Creating Date_Time: ${Date_Time.id}`);
  
  // Save Date_Time in the database
  Date_Time.create(date_time)
    .then((data) => {
      logger.info(`Date_Time created successfully: ${data.id} - ${data.first_date_time} - ${Date_Time.second_date_time}`);
      res.send(data);
    })
    .catch((err) => {
      logger.error(`Error creating Date_Time: ${err.message}`);
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Date_Time.",
      });
    });
};
// Retrieve all Date_Times from the database.
exports.findAll = (req, res) => {
  const id = req.query.id;
  var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;
  
  logger.debug(`Fetching all Date_Times with condition: ${JSON.stringify(condition)}`);
  
  Date_Time.findAll({ where: condition })
    .then((data) => {
      logger.info(`Retrieved ${data.length} Date_Times`);
      res.send(data);
    })
    .catch((err) => {
      logger.error(`Error retrieving Date_Times: ${err.message}`);
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Date_Times.",
      });
    });
};

// // Find a single Date_Time with an id    //not used currently but we might find a use for it
// exports.findAllForUser = (req, res) => {
//   const userId = req.params.userId;
//   Date_Time.findAll({ where: { userId: userId } })
//     .then((data) => {
//       if (data) {
//         res.send(data);
//       } else {
//         res.status(404).send({
//           message: `Cannot find Date_Times for user with id=${userId}.`,
//         });
//       }
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message:
//           err.message ||
//           "Error retrieving Date_Times for user with id=" + userId,
//       });
//     });
// };

// Find a single Date_Time with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  logger.debug(`Finding Date_Time with id: ${id}`);
  
  Date_Time.findByPk(id)
    .then((data) => {
      if (data) {
        logger.info(`Date_Time found: ${id}`);
        res.send(data);
      } else {
        logger.warn(`Date_Time not found with id: ${id}`);
        res.status(404).send({
          message: `Cannot find Date_Time with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      logger.error(`Error retrieving Date_Time ${id}: ${err.message}`);
      res.status(500).send({
        message: err.message || "Error retrieving Date_Time with id=" + id,
      });
    });
};
// Update a Date_Time by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Date_Time.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Date_Time was updated successfully.",
        });
      } else {
        res.send({
          message: `${req.body.first_Date_Time}Cannot update Date_Time with id=${id}. Maybe Date_Time was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating Date_Time with id=" + id,
      });
    });
};
// Delete a Date_Time with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  logger.debug(`Attempting to delete Date_Time: ${id}`);
  
  Date_Time.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        logger.info(`Date_Time ${id} deleted successfully`);
        res.send({
          message: "Date_Time was deleted successfully!",
        });
      } else {
        logger.warn(`Cannot delete Date_Time ${id} - not found`);
        res.send({
          message: `Cannot delete Date_Time with id=${id}. Maybe Date_Time was not found!`,
        });
      }
    })
    .catch((err) => {
      logger.error(`Error deleting Date_Time ${id}: ${err.message}`);
      res.status(500).send({
        message: err.message || "Could not delete Date_Time with id=" + id,
      });
    });
};

export default exports;