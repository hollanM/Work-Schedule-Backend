import db  from "../models/index.js";
import logger from "../config/logger.js";

const Student_Course_List = db.student_course_list;
const Op = db.Sequelize.Op;
const exports = {};

// Create and Save a new Student_Course_List
exports.create = (req, res) => {
  // Validate request
  // if (!req.body.Student_Course_List || !req.body.Student_Course_List) {
  //   logger.warn('Student_Course_List creation attempt with empty employee ID or student_course_list ID');
  //   res.status(400).send({
  //     message: "Student_Course_List content can not be empty!",
  //   });
  //   return;
  // }
  // Create a Student_Course_List
  const student_course_list = {
    user_id: req.body.user_id,
    course_id: req.body.course_id,
  };
  logger.debug(student_course_list.body);
  
  logger.debug(`Creating Student_Course_List: ${Student_Course_List.body}`);
  
  // Save Student_Course_List in the database
  Student_Course_List.create(student_course_list)
    .then((data) => {
      logger.info(`Student_Course_List created successfully: ${data.id} - ${Student_Course_List.name} - ${Student_Course_List.department_schedule} - ${Student_Course_List.break_time_allotted}`);
      res.send(data);
    })
    .catch((err) => {
      logger.error(`Error creating Student_Course_List: ${err.message}`);
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Student_Course_List.",
      });
    });
};
// Retrieve all Departments from the database.
exports.findAll = (req, res) => {
  const id = req.query.id;
  var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;
  
  logger.debug(`Fetching all Departments with condition: ${JSON.stringify(condition)}`);
  
  Student_Course_List.findAll({ where: condition })
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

// // Find a single Student_Course_List with an id    //not used currently but we might find a use for it
// exports.findAllForUser = (req, res) => {
//   const userId = req.params.userId;
//   Student_Course_List.findAll({ where: { userId: userId } })
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

// Find a single Student_Course_List with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  logger.debug(`Finding Student_Course_List with id: ${id}`);
  
  Student_Course_List.findByPk(id)
    .then((data) => {
      if (data) {
        logger.info(`Student_Course_List found: ${id}`);
        res.send(data);
      } else {
        logger.warn(`Student_Course_List not found with id: ${id}`);
        res.status(404).send({
          message: `Cannot find Student_Course_List with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      logger.error(`Error retrieving Student_Course_List ${id}: ${err.message}`);
      res.status(500).send({
        message: err.message || "Error retrieving Student_Course_List with id=" + id,
      });
    });
};
// Update a Student_Course_List by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Student_Course_List.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Student_Course_List was updated successfully.",
        });
      } else {
        res.send({
          message: `${Student_Course_List.body}Cannot update Student_Course_List with id=${id}. Maybe Student_Course_List was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating Student_Course_List with id=" + id,
      });
    });
};
// Delete a Student_Course_List with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  logger.debug(`Attempting to delete Student_Course_List: ${id}`);
  
  Student_Course_List.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        logger.info(`Student_Course_List ${id} deleted successfully`);
        res.send({
          message: "Student_Course_List was deleted successfully!",
        });
      } else {
        logger.warn(`Cannot delete Student_Course_List ${id} - not found`);
        res.send({
          message: `Cannot delete Student_Course_List with id=${id}. Maybe Student_Course_List was not found!`,
        });
      }
    })
    .catch((err) => {
      logger.error(`Error deleting Student_Course_List ${id}: ${err.message}`);
      res.status(500).send({
        message: err.message || "Could not delete Student_Course_List with id=" + id,
      });
    });
};

export default exports;