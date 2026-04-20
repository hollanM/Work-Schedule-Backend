import db  from "../models/index.js";
import logger from "../config/logger.js";

const Weekly_Schedule = db.weekly_schedule;
const Shift = db.shift;
const DateTime = db.date_time;
const Op = db.Sequelize.Op;
const exports = {};
// Create and Save a new Weekly_Schedule
exports.create = (req, res) => {
  // Create a Weekly_Schedule
  const weekly_schedule =  {
    start_day: req.body.start_day,
    end_day: req.body.end_day,
    is_template: req.body.is_template || false,
    department_id: req.body.department_id,
    user_id: req.body.user_id
  };
  
  // Save Weekly_Schedule in the database
  Weekly_Schedule.create(weekly_schedule)
    .then(data => res.send(data))
    .catch((err) => {
      logger.error(`Error creating Weekly_Schedule: ${err.message}`);
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Weekly_Schedule.",
      });
    });
};
// Retrieve all Qualification_Lists from the database.
exports.findAll = (req, res) => {  
  Weekly_Schedule.findAll()
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
  Weekly_Schedule.findAll({ where: { user_id: req.params.id } })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Weekly_Schedules for user the`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Error retrieving Weekly_Schedules for user with id=" + req.params.id,
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




//For the currently viewed week.
//Saving shifts in the viewed week as a template for weeklyschedule
exports.saveTemplate = async (req, res) => {
  try {
    const { user_id, department_id, week_start, week_end } = req.body;

    const weekStart = new Date(week_start + "T00:00:00");
    const weekEnd = new Date(week_end + "T23:59:59");

    const [templateSchedule] = await Weekly_Schedule.findOrCreate({
      where: {
        user_id,
        is_template: true
      },
      defaults: {
        user_id,
        department_id,
        is_template: true,
        start_day: weekStart,
        end_day: weekEnd
      }
    });

    await templateSchedule.update({
      start_day: weekStart,
      end_day: weekEnd
    });

    const templateId = templateSchedule.id;

    await Shift.update(
      { weekly_schedule_id: null },
      { where: { weekly_schedule_id: templateId } }
    );

    const dateTimes = await DateTime.findAll({
      where: {
        first_date_time: {
          [Op.gte]: weekStart,
          [Op.lte]: weekEnd
        }
      }
    });

    const dateIds = dateTimes.map(dt => dt.id);

    if (dateIds.length === 0) 
    { return res.send({ message: "Template saved (no shifts in this week)." }); }

    const currentWeekShifts = await Shift.findAll({
      where: {
        start_day_id: { [Op.in]: dateIds },
        department_id
      }
    });
    for (const shift of currentWeekShifts) {
      await shift.update({ weekly_schedule_id: templateId });
    }
    res.send({ message: "Template saved successfully." });

  } catch (err) {
    logger.error("Error saving template: " + err.message);
    res.status(500).send({ message: err.message });
  }
};



exports.applyTemplate = async (req, res) => {
  try {
    const { user_id, target_week_start } = req.body;

    const targetStart = new Date(target_week_start + "T00:00:00");
    const templateSchedule = await Weekly_Schedule.findOne({
      where: {
        user_id,
        is_template: true
      }
    });

    if (!templateSchedule) 
    { return res.status(404).send({ message: "No template found for this user." }); }

    const templateId = templateSchedule.id;
    const templateStart = new Date(templateSchedule.start_day);
    templateStart.setHours(0, 0, 0, 0);

    const templateShifts = await Shift.findAll({
      where: { weekly_schedule_id: templateId }
    });

    for (const t of templateShifts) {
      const startDT = await DateTime.findByPk(t.start_day_id);
      const endDT = await DateTime.findByPk(t.end_day_id);

      if (!startDT || !endDT) continue;

      const originalStart = new Date(startDT.first_date_time);
      const originalEnd = new Date(endDT.first_date_time);

      const originalStartMidnight = new Date(originalStart);
      originalStartMidnight.setHours(0, 0, 0, 0);

      const offsetDays = Math.floor(
        (originalStartMidnight - templateStart) / (1000 * 60 * 60 * 24)
      );

      const newStart = new Date(targetStart);
      newStart.setDate(newStart.getDate() + offsetDays);
      newStart.setHours(
        originalStart.getHours(),
        originalStart.getMinutes(),
        originalStart.getSeconds()
      );

      const durationMs = originalEnd - originalStart;
      const newEnd = new Date(newStart.getTime() + durationMs);
      const newStartDT = await DateTime.create({
        first_date_time: newStart,
        second_date_time: null
      });

      const newEndDT = await DateTime.create({
        first_date_time: newEnd,
        second_date_time: null
      }); 

      await Shift.create({
        user_id: t.user_id,
        position_id: t.position_id,
        shift_task_list_id: t.shift_task_list_id,
        department_id: t.department_id,
        qualification_list_id: t.qualification_list_id,
        color: t.color,
        start_day_id: newStartDT.id,
        end_day_id: newEndDT.id,
        weekly_schedule_id: null,
        is_template: false,
        published: false,
        open_to_take: false,
        has_gone_on_break: false,
        swap_history: ""
      });
    }

    res.send({ message: "Template applied successfully." });

  } catch (err) {
    logger.error("Error applying template: " + err.message);
    res.status(500).send({ message: err.message });
  }
};


export default exports;
