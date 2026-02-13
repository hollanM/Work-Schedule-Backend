import db  from "../models/index.js";
import logger from "../config/logger.js";

const In_app_settings = db.in_app_settings;
const Op = db.Sequelize.Op;
const exports = {};

// Create and Save a new In_app_settings
exports.create = (req, res) => {
  // Validate request
  // if (!req.body.In_app_settings || !req.body.In_app_settings) {
  //   logger.warn('In_app_settings creation attempt with empty employee ID or in_app_settings ID');
  //   res.status(400).send({
  //     message: "In_app_settings content can not be empty!",
  //   });
  //   return;
  // }
  // Create a In_app_settings
  const in_app_settings = {
    app_setting_1: req.body.app_setting_1,//cant do the null check here with bools
    app_setting_2: req.body.app_setting_2,
    app_setting_3: req.body.app_setting_3,
  };
  logger.debug(in_app_settings.body);
  
  logger.debug(`Creating In_app_settings: ${In_app_settings.body}`);
  
  // Save In_app_settings in the database
  In_app_settings.create(in_app_settings)
    .then((data) => {
      logger.info(`In_app_settings created successfully: ${data.id} - ${In_app_settings.app_setting_1} - ${In_app_settings.app_setting_2} - ${In_app_settings.app_setting_3}`);
      res.send(data);
    })
    .catch((err) => {
      logger.error(`Error creating In_app_settings: ${err.message}`);
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the In_app_settings.",
      });
    });
};
// Retrieve all In_app_settingss from the database.
exports.findAll = (req, res) => {
  const id = req.query.id;
  var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;
  
  logger.debug(`Fetching all In_app_settingss with condition: ${JSON.stringify(condition)}`);
  
  In_app_settings.findAll({ where: condition })
    .then((data) => {
      logger.info(`Retrieved ${data.length} In_app_settings`);
      res.send(data);
    })
    .catch((err) => {
      logger.error(`Error retrieving In_app_settings: ${err.message}`);
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving In_app_settings.",
      });
    });
};

// // Find a single In_app_settings with an id    //not used currently but we might find a use for it
// exports.findAllForUser = (req, res) => {
//   const userId = req.params.userId;
//   In_app_settings.findAll({ where: { userId: userId } })
//     .then((data) => {
//       if (data) {
//         res.send(data);
//       } else {
//         res.status(404).send({
//           message: `Cannot find In_app_settingss for user with id=${userId}.`,
//         });
//       }
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message:
//           err.message ||
//           "Error retrieving In_app_settingss for user with id=" + userId,
//       });
//     });
// };

// Find a single In_app_settings with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  logger.debug(`Finding In_app_settings with id: ${id}`);
  
  In_app_settings.findByPk(id)
    .then((data) => {
      if (data) {
        logger.info(`In_app_settings found: ${id}`);
        res.send(data);
      } else {
        logger.warn(`In_app_settings not found with id: ${id}`);
        res.status(404).send({
          message: `Cannot find In_app_settings with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      logger.error(`Error retrieving In_app_settings ${id}: ${err.message}`);
      res.status(500).send({
        message: err.message || "Error retrieving In_app_settings with id=" + id,
      });
    });
};
// Update a In_app_settings by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  In_app_settings.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "In_app_settings was updated successfully.",
        });
      } else {
        res.send({
          message: `${In_app_settings.body}Cannot update In_app_settings with id=${id}. Maybe In_app_settings was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating In_app_settings with id=" + id,
      });
    });
};
// Delete a In_app_settings with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  logger.debug(`Attempting to delete In_app_settings: ${id}`);
  
  In_app_settings.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        logger.info(`In_app_settings ${id} deleted successfully`);
        res.send({
          message: "In_app_settings was deleted successfully!",
        });
      } else {
        logger.warn(`Cannot delete In_app_settings ${id} - not found`);
        res.send({
          message: `Cannot delete In_app_settings with id=${id}. Maybe In_app_settings was not found!`,
        });
      }
    })
    .catch((err) => {
      logger.error(`Error deleting In_app_settings ${id}: ${err.message}`);
      res.status(500).send({
        message: err.message || "Could not delete In_app_settings with id=" + id,
      });
    });
};

export default exports;