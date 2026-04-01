import db  from "../models/index.js";
import logger from "../config/logger.js";

const Instructor = db.instructor;
const Op = db.Sequelize.Op;
const exports = {};

// Create and Save a new Instructor
exports.create = (req, res) => {
  // Validate request
  // if (!req.body.Instructor || !req.body.Instructor) {
  //   logger.warn('Instructor creation attempt with empty employee ID or instructor ID');
  //   res.status(400).send({
  //     message: "Instructor content can not be empty!",
  //   });
  //   return;
  // }
  // Create a Instructor
  const instructor = {
    name: req.body.name,
    email: req.body.email,
    instructor_list_id: req.body.instructor_list_id,
  };
  logger.debug(instructor.body);
  
  logger.debug(`Creating Instructor: ${Instructor.body}`);
  
  // Save Instructor in the database
  Instructor.create(instructor)
    .then((data) => {
      logger.info(`Instructor created successfully: ${data.id} - ${Instructor.name} - ${Instructor.department_schedule} - ${Instructor.break_time_allotted}`);
      res.send(data);
    })
    .catch((err) => {
      logger.error(`Error creating Instructor: ${err.message}`);
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Instructor.",
      });
    });
};
// Retrieve all Departments from the database.
exports.findAll = (req, res) => {
  const id = req.query.id;
  var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;
  
  logger.debug(`Fetching all Departments with condition: ${JSON.stringify(condition)}`);
  
  Instructor.findAll({ where: condition })
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

// // Find a single Instructor with an id    //not used currently but we might find a use for it
// exports.findAllForUser = (req, res) => {
//   const userId = req.params.userId;
//   Instructor.findAll({ where: { userId: userId } })
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

// Find a single Instructor with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  logger.debug(`Finding Instructor with id: ${id}`);
  
  Instructor.findByPk(id)
    .then((data) => {
      if (data) {
        logger.info(`Instructor found: ${id}`);
        res.send(data);
      } else {
        logger.warn(`Instructor not found with id: ${id}`);
        res.status(404).send({
          message: `Cannot find Instructor with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      logger.error(`Error retrieving Instructor ${id}: ${err.message}`);
      res.status(500).send({
        message: err.message || "Error retrieving Instructor with id=" + id,
      });
    });
};
// Update a Instructor by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Instructor.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Instructor was updated successfully.",
        });
      } else {
        res.send({
          message: `${Instructor.body}Cannot update Instructor with id=${id}. Maybe Instructor was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating Instructor with id=" + id,
      });
    });
};
// Delete a Instructor with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  logger.debug(`Attempting to delete Instructor: ${id}`);
  
  Instructor.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        logger.info(`Instructor ${id} deleted successfully`);
        res.send({
          message: "Instructor was deleted successfully!",
        });
      } else {
        logger.warn(`Cannot delete Instructor ${id} - not found`);
        res.send({
          message: `Cannot delete Instructor with id=${id}. Maybe Instructor was not found!`,
        });
      }
    })
    .catch((err) => {
      logger.error(`Error deleting Instructor ${id}: ${err.message}`);
      res.status(500).send({
        message: err.message || "Could not delete Instructor with id=" + id,
      });
    });
};

export default exports;