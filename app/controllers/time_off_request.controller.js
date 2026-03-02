import db  from "../models/index.js";
import logger from "../config/logger.js";

const Time_off = db.time_off_request;
const Op = db.Sequelize.Op;
const exports = {};

// Create and Save a new Time_off
exports.create = (req, res) => {
  // Validate request
  // if (!req.body.Time_off || !req.body.Time_off) {
  //   logger.warn('Time_off creation attempt with empty employee ID or department ID');
  //   res.status(400).send({
  //     message: "Time_off content can not be empty!",
  //   });
  //   return;
  // }
  // Create a Time_off
  const time_off = {
    start_time_id: req.body.start_time_id,
    end_time_id: req.body.end_time_id,
    is_available: req.body.is_available, //these bools cannot be checked the same way, they get auto nulled
    is_approved: req.body.is_approved,
    employee_id: req.body.employee_id
  };
  logger.debug(time_off.body);
  
  logger.debug(`Creating Time_off...}`);
  
  // Save Time_off in the database
  Time_off.create(time_off)
    .then((data) => {
      logger.info(`Time_off created successfully: ${data.id} - ${data.date_time_id} - ${Time_off.is_available} - ${Time_off.is_approved} - ${Time_off.employee_id}`);
      res.send(data);
    })
    .catch((err) => {
      logger.error(`Error creating Time_off: ${err.message}`);
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Time_off.",
      });
    });
};
// Retrieve all Time_offs from the database.
exports.findAll = (req, res) => {
  const id = req.query.id;
  var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;
  
  logger.debug(`Fetching all Time_offs with condition: ${JSON.stringify(condition)}`);
  
  Time_off.findAll({ where: condition })
    .then((data) => {
      logger.info(`Retrieved ${data.length} Time_offs`);
      res.send(data);
    })
    .catch((err) => {
      logger.error(`Error retrieving Time_offs: ${err.message}`);
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Time_offs.",
      });
    });
};

// // Find a single Time_off with an id    //not used currently but we might find a use for it
// exports.findAllForUser = (req, res) => {
//   const userId = req.params.userId;
//   Time_off.findAll({ where: { userId: userId } })
//     .then((data) => {
//       if (data) {
//         res.send(data);
//       } else {
//         res.status(404).send({
//           message: `Cannot find Time_offs for user with id=${userId}.`,
//         });
//       }
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message:
//           err.message ||
//           "Error retrieving Time_offs for user with id=" + userId,
//       });
//     });
// };

// Find a single Time_off with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  logger.debug(`Finding Time_off with id: ${id}`);
  
  Time_off.findByPk(id)
    .then((data) => {
      if (data) {
        logger.info(`Time_off found: ${id}`);
        res.send(data);
      } else {
        logger.warn(`Time_off not found with id: ${id}`);
        res.status(404).send({
          message: `Cannot find Time_off with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      logger.error(`Error retrieving Time_off ${id}: ${err.message}`);
      res.status(500).send({
        message: err.message || "Error retrieving Time_off with id=" + id,
      });
    });
};
// Update a Time_off by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Time_off.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Time_off was updated successfully.",
        });
      } else {
        res.send({
          message: `${Time_off.body}Cannot update Time_off with id=${id}. Maybe Time_off was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating Time_off with id=" + id,
      });
    });
};
// Delete a Time_off with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  logger.debug(`Attempting to delete Time_off: ${id}`);
  
  Time_off.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        logger.info(`Time_off ${id} deleted successfully`);
        res.send({
          message: "Time_off was deleted successfully!",
        });
      } else {
        logger.warn(`Cannot delete Time_off ${id} - not found`);
        res.send({
          message: `Cannot delete Time_off with id=${id}. Maybe Time_off was not found!`,
        });
      }
    })
    .catch((err) => {
      logger.error(`Error deleting Time_off ${id}: ${err.message}`);
      res.status(500).send({
        message: err.message || "Could not delete Time_off with id=" + id,
      });
    });
};

export default exports;