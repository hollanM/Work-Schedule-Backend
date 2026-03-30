import db  from "../models/index.js";
import logger from "../config/logger.js";

const Course_Meet = db.course_meet;
const Op = db.Sequelize.Op;
const exports = {};

// Create and Save a new Course_Meet
exports.create = (req, res) => {
  // Validate request
  // if (!req.body.Course_Meet || !req.body.Course_Meet) {
  //   logger.warn('Course_Meet creation attempt with empty employee ID or course_meet ID');
  //   res.status(400).send({
  //     message: "Course_Meet content can not be empty!",
  //   });
  //   return;
  // }
  // Create a Course_Meet
  const course_meet = {
    course_id: req.body.course_id,
    start_time: req.body.start_time,
    end_time: req.body.end_time,
  };
  logger.debug(course_meet.body);
  
  logger.debug(`Creating Course_Meet: ${Course_Meet.body}`);
  
  // Save Course_Meet in the database
  Course_Meet.create(course_meet)
    .then((data) => {
      logger.info();
      res.send(data);
    })
    .catch((err) => {
      logger.error(`Error creating Course_Meet: ${err.message}`);
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Course_Meet.",
      });
    });
};
// Retrieve all Departments from the database.
exports.findAll = (req, res) => {
  const id = req.query.id;
  var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;
  
  logger.debug(`Fetching all Departments with condition: ${JSON.stringify(condition)}`);
  
  Course_Meet.findAll({ where: condition })
    .then((data) => {
      logger.info(`Retrieved ${data.length} Departments`);
      res.send(data);
    })
    .catch((err) => {
      logger.error(`Error retrieving Departments: ${err.message}`);
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Departments.",
      });
    });
};

// // Find a single Course_Meet with an id    //not used currently but we might find a use for it
// exports.findAllForUser = (req, res) => {
//   const userId = req.params.userId;
//   Course_Meet.findAll({ where: { userId: userId } })
//     .then((data) => {
//       if (data) {
//         res.send(data);
//       } else {
//         res.status(404).send({
//           message: `Cannot find Departments for user with id=${userId}.`,
//         });
//       }
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message:
//           err.message ||
//           "Error retrieving Departments for user with id=" + userId,
//       });
//     });
// };

// Find a single Course_Meet with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  logger.debug(`Finding Course_Meet with id: ${id}`);
  
  Course_Meet.findByPk(id)
    .then((data) => {
      if (data) {
        logger.info(`Course_Meet found: ${id}`);
        res.send(data);
      } else {
        logger.warn(`Course_Meet not found with id: ${id}`);
        res.status(404).send({
          message: `Cannot find Course_Meet with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      logger.error(`Error retrieving Course_Meet ${id}: ${err.message}`);
      res.status(500).send({
        message: err.message || "Error retrieving Course_Meet with id=" + id,
      });
    });
};
// Update a Course_Meet by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Course_Meet.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Course_Meet was updated successfully.",
        });
      } else {
        res.send({
          message: `${Course_Meet.body}Cannot update Course_Meet with id=${id}. Maybe Course_Meet was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating Course_Meet with id=" + id,
      });
    });
};
// Delete a Course_Meet with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  logger.debug(`Attempting to delete Course_Meet: ${id}`);
  
  Course_Meet.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        logger.info(`Course_Meet ${id} deleted successfully`);
        res.send({
          message: "Course_Meet was deleted successfully!",
        });
      } else {
        logger.warn(`Cannot delete Course_Meet ${id} - not found`);
        res.send({
          message: `Cannot delete Course_Meet with id=${id}. Maybe Course_Meet was not found!`,
        });
      }
    })
    .catch((err) => {
      logger.error(`Error deleting Course_Meet ${id}: ${err.message}`);
      res.status(500).send({
        message: err.message || "Could not delete Course_Meet with id=" + id,
      });
    });
};

export default exports;