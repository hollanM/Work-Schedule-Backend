import db  from "../models/index.js";
import logger from "../config/logger.js";
import { or } from "sequelize";

const Weekly_Schedule = db.weekly_schedule;
const Op = db.Sequelize.Op;
const exports = {};

const Shift = db.shift;


// Create and Save a new Weekly_Schedule
exports.create = (req, res) => {
  // Create a Weekly_Schedule
  const weekly_schedule =  {
    start_day: req.body.start_day,
    end_day: req.body.end_day,
    is_template: req.body.is_template,
    department_id: req.body.department_id,
    user_id: req.body.user_id
  };
  
  logger.debug(`Creating Weekly_Schedule...`);
  
  // Save Weekly_Schedule in the database
  Weekly_Schedule.create(weekly_schedule)
    .then((data) => {
      logger.info(`Weekly_Schedule created successfully: ${data.id} - ${data.name}`);
      res.send(data);
    })
    .catch((err) => {
      logger.error(`Error creating Weekly_Schedule: ${err.message}`);
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Weekly_Schedule.",
      });
    });
};

// Retrieve all Weekly_Schedules from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
 
  Weekly_Schedule.findAll({ where: { user_id: userId } })
    .then((data) => {
      logger.info(`Retrieved ${data.length} Qualification_Lists`);
      res.send(data);
    })
    .catch((err) => {
      logger.error(`Error retrieving Qualification_Lists: ${err.message}`);
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Qualification_Lists.",
      });
    });
};

// Find a single Weekly_Schedule with an id
exports.findAllForUser = (req, res) => {
  const userId = req.params.id;
  Weekly_Schedule.findAll({ where: { user_id: userId } })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Qualification_Lists for user with id=${userId}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Error retrieving Qualification_Lists for user with id=" + userId,
      });
    });
};
// Find a single Weekly_Schedule with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  logger.debug(`Finding Weekly_Schedule with id: ${id}`);
  
  Weekly_Schedule.findByPk(id)
    .then((data) => {
      if (data) {
        logger.info(`Weekly_Schedule found: ${id}`);
        res.send(data);
      } else {
        logger.warn(`Weekly_Schedule not found with id: ${id}`);
        res.status(404).send({
          message: `Cannot find Weekly_Schedule with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      logger.error(`Error retrieving Weekly_Schedule ${id}: ${err.message}`);
      res.status(500).send({
        message: err.message || "Error retrieving Weekly_Schedule with id=" + id,
      });
    });
};


// Update a Weekly_Schedule by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Weekly_Schedule.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Weekly_Schedule was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Weekly_Schedule with id=${id}. Maybe Weekly_Schedule was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating Weekly_Schedule with id=" + id,
      });
    });
};


// Delete a Weekly_Schedule with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  logger.debug(`Attempting to delete Weekly_Schedule: ${id}`);
  
  Weekly_Schedule.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        logger.info(`Weekly_Schedule ${id} deleted successfully`);
        res.send({
          message: "Weekly_Schedule was deleted successfully!",
        });
      } else {
        logger.warn(`Cannot delete Weekly_Schedule ${id} - not found`);
        res.send({
          message: `Cannot delete Weekly_Schedule with id=${id}. Maybe Weekly_Schedule was not found!`,
        });
      }
    })
    .catch((err) => {
      logger.error(`Error deleting Weekly_Schedule ${id}: ${err.message}`);
      res.status(500).send({
        message: err.message || "Could not delete Weekly_Schedule with id=" + id,
      });
    });
};






//Saving shifts in the viewed week as a template for weeklyschedule
exports.saveTemplate = async (req, res) => {
  try {
    const { user_id, department_id, week_start, week_end } = req.body;
    const [templateSchedule] = await Weekly_Schedule.findOrCreate({
      where: {
        user_id: user_id,
        is_template: true
      },
      defaults: {
        user_id: user_id,
        department_id,
        is_template: true,
        start_day: week_start,
        end_day: week_end
      }
    });

      await templateSchedule.update({
      start_day: week_start,
      end_day: week_end
    });
    
    
    //Weekly_Schedule is the templateId
    const templateId = templateSchedule.id;
    await Shift.update(
      { weekly_schedule_id: null },
      { where: { weekly_schedule_id: templateId } }
    );

   const currentWeekShifts = await Shift.findAll({
      where: {
        start_day: {
          [Op.gte]: week_start + " 00:00:00",
          [Op.lt]: week_end + " 23:59:59"
        }
      }
    });

    for (const shift of currentWeekShifts) {
      await shift.update({
        weekly_schedule_id: templateId
      });
    }
    res.send({ message: "Template saved successfully." });
  } 
  catch (err) {
    logger.error("Error saving template: " + err.message);
    res.status(500).send({ message: err.message });
  }
};


//For Pasting the weekly template
exports.applyTemplate = async (req, res) => {
  try {
    const { user_id, target_week_start, target_week_end } = req.body;
    const templateSchedule = await Weekly_Schedule.findOne({
      where: {
        user_id: user_id,
      }
    });
    if (!templateSchedule) {
      return res.status(404).send({ message: "No template found for this user." });
    }
    const templateId = templateSchedule.id;
    const templateShifts = await Shift.findAll({
      where: {
        weekly_schedule_id: templateId,
      }
    });

    const templateStart = new Date(templateSchedule.start_day);
    templateStart.setHours(0, 0, 0, 0);

    const targetStart = new Date(target_week_start);
    targetStart.setHours(0, 0, 0, 0);

    for (const t of templateShifts) {
      const original = new Date(t.start_day);

      const originalHours = original.getHours();
      const originalMinutes = original.getMinutes();
      const originalSeconds = original.getSeconds();

      const originalStart = new Date(t.start_day);
      originalStart.setHours(0, 0, 0, 0);

      const offsetDays = Math.floor(
        (originalStart - templateStart) / (1000 * 60 * 60 * 24)
      );

      const newStart = new Date(targetStart);
      newStart.setDate(newStart.getDate() + offsetDays);

      newStart.setHours(originalHours, originalMinutes, originalSeconds, 0);

      const durationMs = new Date(t.end_day) - new Date(t.start_day);
      const newEnd = new Date(newStart.getTime() + durationMs);

      await Shift.create({
        user_id: t.user_id,
        position_id: t.position_id,
        shift_task_list_id: t.shift_task_list_id,
        department_id: t.department_id,
        qualification_list_id: t.qualification_list_id,
        color: t.color,

        start_day: newStart,
        end_day: newEnd,

        weekly_schedule_id: null,
        is_template: false,
        published: false
      });
    }


    res.send({ message: "Template applied successfully." });

  } catch (err) {
    logger.error("Error applying template: " + err.message);
    res.status(500).send({ message: err.message });
  }
};


export default exports;