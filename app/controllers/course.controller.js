import db  from "../models/index.js";
import logger from "../config/logger.js";

const Course = db.course;
const Op = db.Sequelize.Op;
const exports = {};

// Create and Save a new Course
exports.create = (req, res) => {
  // Validate request
  // if (!req.body.Course || !req.body.Course) {
  //   logger.warn('Course creation attempt with empty employee ID or course ID');
  //   res.status(400).send({
  //     message: "Course content can not be empty!",
  //   });
  //   return;
  // }
  // Create a Course
  const course = {
    name: req.body.name,
    course_id: req.body.course_id,
    start_date: req.body.start_date,
    end_date: req.body.end_date,
  };
  logger.debug(course.body);
  
  logger.debug(`Creating Course: ${Course.body}`);
  
  // Save Course in the database
  Course.create(course)
    .then((data) => {
      logger.info(`Course created successfully: ${data.id} - ${Course.name} - ${Course.department_schedule} - ${Course.break_time_allotted}`);
      res.send(data);
    })
    .catch((err) => {
      logger.error(`Error creating Course: ${err.message}`);
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Course.",
      });
    });
};
// Retrieve all Departments from the database.
exports.findAll = (req, res) => {
  const id = req.query.id;
  var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;
  
  logger.debug(`Fetching all Departments with condition: ${JSON.stringify(condition)}`);
  
  Course.findAll({ where: condition })
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

// // Find a single Course with an id    //not used currently but we might find a use for it
// exports.findAllForUser = (req, res) => {
//   const userId = req.params.userId;
//   Course.findAll({ where: { userId: userId } })
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

// Find a single Course with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  logger.debug(`Finding Course with id: ${id}`);
  
  Course.findByPk(id)
    .then((data) => {
      if (data) {
        logger.info(`Course found: ${id}`);
        res.send(data);
      } else {
        logger.warn(`Course not found with id: ${id}`);
        res.status(404).send({
          message: `Cannot find Course with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      logger.error(`Error retrieving Course ${id}: ${err.message}`);
      res.status(500).send({
        message: err.message || "Error retrieving Course with id=" + id,
      });
    });
};
// Update a Course by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Course.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Course was updated successfully.",
        });
      } else {
        res.send({
          message: `${Course.body}Cannot update Course with id=${id}. Maybe Course was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating Course with id=" + id,
      });
    });
};
// Delete a Course with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  logger.debug(`Attempting to delete Course: ${id}`);
  
  Course.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        logger.info(`Course ${id} deleted successfully`);
        res.send({
          message: "Course was deleted successfully!",
        });
      } else {
        logger.warn(`Cannot delete Course ${id} - not found`);
        res.send({
          message: `Cannot delete Course with id=${id}. Maybe Course was not found!`,
        });
      }
    })
    .catch((err) => {
      logger.error(`Error deleting Course ${id}: ${err.message}`);
      res.status(500).send({
        message: err.message || "Could not delete Course with id=" + id,
      });
    });
};

export default exports;