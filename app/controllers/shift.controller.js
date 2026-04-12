import db  from "../models/index.js";
import logger from "../config/logger.js";

const Shift = db.shift;
const Op = db.Sequelize.Op;
const exports = {};
// Create and Save a new Shift
exports.create = (req, res) => {

  // Create a Shift
  const shift = {
    //please tell me how to turn suggestions off :(
    user_id: req.body.user_id,
    start_day_id: req.body.start_day_id,
    end_day_id: req.body.end_day_id,
    position_id: req.body.position_id,
    shift_task_list_id: req.body.shift_task_list_id,
    weekly_schedule_id: req.body.weekly_schedule_id,
    department_id: req.body.department_id,
    qualification_list_id: req.body.qualification_list_id,
    color: req.body.color,


    //non id fields
    open_to_take: req.body.open_to_take || false,
    swap_history: req.body.swap_history || "",
    is_template: req.body.is_template || false,
    has_gone_on_break: req.body.has_gone_on_break || false,
    published: req.body.published || false
  };
  
  logger.debug(`Creating Shift...`);
  
  // Save Shift in the database
  Shift.create(shift)
    .then((data) => {
      logger.info(`Shift created successfully: ${data.id} - ${data.title}`);
      res.send(data);
    })
    .catch((err) => {
      logger.error(`Error creating Shift: ${err.message}`);
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Shift.",
      });
    });
};
// Retrieve all Shifts from the database.
exports.findAll = (req, res) => {
  const ShiftId = req.query.shift_id;
  var condition = ShiftId
    ? {
        ShiftId: {
          [Op.like]: `%${ShiftId}%`,
        },
      }
    : null;

  logger.debug(`Fetching all Shifts with condition: ${JSON.stringify(condition)}`);

  Shift.findAll({ where: condition })
    .then((data) => {
      logger.info(`Retrieved ${data.length} Shifts`);
      res.send(data);
    })
    .catch((err) => {
      logger.error(`Error retrieving Shifts: ${err.message}`);
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Shifts.",
      });
    });
};

// Retrieve all Shifts with the same department from the database.
exports.findAllDept = (req, res) => {
  const department = req.params.department_id;
  const condition = department
    ? { department_id: department }
    : null;

  logger.debug(`Fetching all Shifts with condition: ${JSON.stringify(condition)}`);

  Shift.findAll({ where: condition })
    .then((data) => {
      logger.info(`Retrieved ${data.length} Shifts`);
      res.send(data);
    })
    .catch((err) => {
      logger.error(`Error retrieving Shifts: ${err.message}`);
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Shifts.",
      });
    });
};

// Find a single Shift with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  logger.debug(`Finding Shift with id: ${id}`);
  
  Shift.findByPk(id)
    .then((data) => {
      if (data) {
        logger.info(`Shift found: ${id}`);
        res.send(data);
      } else {
        logger.warn(`Shift not found with id: ${id}`);
        res.status(404).send({
          message: `Cannot find Shift with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      logger.error(`Error retrieving Shift ${id}: ${err.message}`);
      res.status(500).send({
        message: "Error retrieving Shift with id=" + id,
      });
    });
};

exports.findForUser = (req, res) => {
  const user_id = req.params.user_id;
  logger.debug(`Finding Shifts for user with id: ${user_id}`);
  Shift.findAll({ where: { user_id: user_id } })
    .then((data) => {
      logger.info(`Retrieved ${data.length} Shifts for user ${user_id}`);
      res.send(data);
    })
    .catch((err) => {
      logger.error(`Error retrieving Shifts for user ${user_id}: ${err.message}`);
      res.status(500).send({
        message: "Error retrieving Shifts for user with id=" + user_id,
      });
    });
  };

// Update a Shift by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  logger.debug(`Updating Shift ${id} with data: ${JSON.stringify(req.body)}`);
  
  Shift.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        logger.info(`Shift ${id} updated successfully`);
        res.send({
          message: "Shift was updated successfully.",
        });
      } else {
        logger.warn(`Failed to update Shift ${id} - not found or empty body`);
        res.send({
          message: `Cannot update Shift with id=${id}. Maybe Shift was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      logger.error(`Error updating Shift ${id}: ${err.message}`);
      res.status(500).send({
        message: "Error updating Shift with id=" + id,
      });
    });
};
// Delete a Shift with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  logger.debug(`Attempting to delete Shift: ${id}`);
  
  Shift.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        logger.info(`Shift ${id} deleted successfully`);
        res.send({
          message: "Shift was deleted successfully!",
        });
      } else {
        logger.warn(`Cannot delete Shift ${id} - not found`);
        res.send({
          message: `Cannot delete Shift with id=${id}. Maybe Shift was not found!`,
        });
      }
    })
    .catch((err) => {
      logger.error(`Error deleting Shift ${id}: ${err.message}`);
      res.status(500).send({
        message: "Could not delete Shift with id=" + id,
      });
    });
};

// Find all published Shifts

export default exports;
