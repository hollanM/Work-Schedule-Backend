import db  from "../models/index.js";
import logger from "../config/logger.js";

const Instructor_List = db.instructor_list;
const Op = db.Sequelize.Op;
const exports = {};

// Create and Save a new Instructor_List
exports.create = (req, res) => {
  // Validate request
  // if (!req.body.Instructor_List || !req.body.Instructor_List) {
  //   logger.warn('Instructor_List creation attempt with empty employee ID or instructor_list ID');
  //   res.status(400).send({
  //     message: "Instructor_List content can not be empty!",
  //   });
  //   return;
  // }
  // Create a Instructor_List
  const instructor_list = {
    name: req.body.name,
    course_id: req.body.course_id,
  };
  logger.debug(instructor_list.body);
  
  logger.debug(`Creating Instructor_List: ${instructor_list.body}`);
  
  // Save Instructor_List in the database
  Instructor_List.create(instructor_list)
    .then((data) => {
      logger.info();
      res.send(data);
    })
    .catch((err) => {
      logger.error(`Error creating Instructor_List: ${err.message}`);
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Instructor_List.",
      });
    });
};
// Retrieve all Departments from the database.
exports.findAll = (req, res) => {
  const id = req.query.id;
  var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;
  
  logger.debug(`Fetching all Departments with condition: ${JSON.stringify(condition)}`);
  
  Instructor_List.findAll({ where: condition })
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

// // Find a single Instructor_List with an id    //not used currently but we might find a use for it
// exports.findAllForUser = (req, res) => {
//   const userId = req.params.userId;
//   Instructor_List.findAll({ where: { userId: userId } })
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

// Find a single Instructor_List with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  logger.debug(`Finding Instructor_List with id: ${id}`);
  
  Instructor_List.findByPk(id)
    .then((data) => {
      if (data) {
        logger.info(`Instructor_List found: ${id}`);
        res.send(data);
      } else {
        logger.warn(`Instructor_List not found with id: ${id}`);
        res.status(404).send({
          message: `Cannot find Instructor_List with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      logger.error(`Error retrieving Instructor_List ${id}: ${err.message}`);
      res.status(500).send({
        message: err.message || "Error retrieving Instructor_List with id=" + id,
      });
    });
};
// Update a Instructor_List by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Instructor_List.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Instructor_List was updated successfully.",
        });
      } else {
        res.send({
          message: `${Instructor_List.body}Cannot update Instructor_List with id=${id}. Maybe Instructor_List was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating Instructor_List with id=" + id,
      });
    });
};
// Delete a Instructor_List with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  logger.debug(`Attempting to delete Instructor_List: ${id}`);
  
  Instructor_List.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        logger.info(`Instructor_List ${id} deleted successfully`);
        res.send({
          message: "Instructor_List was deleted successfully!",
        });
      } else {
        logger.warn(`Cannot delete Instructor_List ${id} - not found`);
        res.send({
          message: `Cannot delete Instructor_List with id=${id}. Maybe Instructor_List was not found!`,
        });
      }
    })
    .catch((err) => {
      logger.error(`Error deleting Instructor_List ${id}: ${err.message}`);
      res.status(500).send({
        message: err.message || "Could not delete Instructor_List with id=" + id,
      });
    });
};

export default exports;