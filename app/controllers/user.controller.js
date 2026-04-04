import db  from "../models/index.js";
import logger from "../config/logger.js";
import axios from "axios";
import Course from "../models/course.js";
import CourseMeet from "../models/courseMeet.js";
import InstructorList from "../models/instructorList.js";
import Instructor from "../models/instructor.js";
import StudentCourseList from "../models/studentCourseList.js";

const User = db.user;
const Op = db.Sequelize.Op;
const exports = {};



const dayMap = {
  M: "Monday",
  T: "Tuesday",
  W: "Wednesday",
  TH: "Thursday",
  F: "Friday",
  SA: "Saturday",
  SU: "Sunday",
};

const formatTime = (timeStr) => {
  if (!timeStr) return null;

  const [time, modifier] = timeStr.match(/(\d+:\d+)(AM|PM)/).slice(1);
  let [hours, minutes] = time.split(":");

  if (modifier === "PM" && hours !== "12") hours = parseInt(hours) + 12;
  if (modifier === "AM" && hours === "12") hours = "00";

  return `${hours.toString().padStart(2, "0")}:${minutes}:00`;
};
// Create and Save a new User
exports.create = (req, res) => {
  // Validate request
  if (!req.body.fName) {
    logger.warn('User creation attempt with empty fName');
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a User
  const user = {
    id: req.body.id,
    fName: req.body.fName,
    lName: req.body.lName,
    email: req.body.email,
    department_id: req.body.department_id,
    role: req.body.role,
    oc_id: req.body.oc_id,
    phone_num: req.body.phone_num,
    clocked_in: req.body.clocked_num,
    pay_rate: req.body.pay_rate

    // refresh_token: req.body.refresh_token,
    // expiration_date: req.body.expiration_date
  };

  logger.debug(`Creating user: ${user.email}`);

  // Save User in the database
  User.create(user)
    .then((data) => {
      logger.info(`User created successfully: ${data.id} - ${data.email}`);
      res.send(data);
    })
    .catch((err) => {
      logger.error(`Error creating user: ${err.message}`);
      res.status(500).send({
        message: err.message || "Some error occurred while creating the User.",
      });
    });
};

// Retrieve all People from the database.
exports.findAll = (req, res) => {
  const id = req.query.id;
  var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;

  logger.debug(`Fetching all users with condition: ${JSON.stringify(condition)}`);

  User.findAll({ where: condition })
    .then((data) => {
      logger.info(`Retrieved ${data.length} users`);
      res.send(data);
    })
    .catch((err) => {
      logger.error(`Error retrieving users: ${err.message}`);
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving people.",
      });
    });
};

// Find a single User with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  logger.debug(`Finding user with id: ${id}`);

  User.findByPk(id)
    .then((data) => {
      if (data) {
        logger.info(`User found: ${id}`);
        res.send(data);
      } else {
        logger.warn(`User not found with id: ${id}`);
        res.status(404).send({
          message: `Cannot find User with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      logger.error(`Error retrieving user ${id}: ${err.message}`);
      res.status(500).send({
        message: "Error retrieving User with id=" + id,
      });
    });
};

// Find a single User with an email
exports.findByEmail = (req, res) => {
  const email = req.params.email;

  logger.debug(`Finding user with email: ${email}`);

  User.findOne({
    where: {
      email: email,
    },
  })
    .then((data) => {
      if (data) {
        logger.info(`User found by email: ${email}`);
        res.send(data);
      } else {
        logger.warn(`User not found with email: ${email}`);
        res.send({ email: "not found" });
        /*res.status(404).send({
          message: `Cannot find User with email=${email}.`
        });*/
      }
    })
    .catch((err) => {
      logger.error(`Error retrieving user by email ${email}: ${err.message}`);
      res.status(500).send({
        message: "Error retrieving User with email=" + email,
      });
    });
};

// Update a User by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  logger.debug(`Updating user ${id} with data: ${JSON.stringify(req.body)}`);

  User.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        logger.info(`User ${id} updated successfully`);
        res.send({
          message: "User was updated successfully.",
        });
      } else {
        logger.warn(`Failed to update user ${id} - not found or empty body`);
        res.send({
          message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      logger.error(`Error updating user ${id}: ${err.message}`);
      res.status(500).send({
        message: "Error updating User with id=" + id,
      });
    });
};




exports.fetch_and_create_schedule = async (req, res) => {
  const userId = req.params.id;

  try {

    // 1. Get user from DB
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const email = user.email;

    // 2. Call external API using email
    const response = await axios.get(`YOUR_API_URL?email=${email}`);

    const data = response.data;

    // (continue your schedule logic here...)

    res.send({ message: "Success" });
    // 1. Call external API
   

    if (!data.Success) {
      return res.status(400).send({ message: "API returned failure" });
    }

    // 2. Loop through courses
    for (const courseData of data.Courses) {

      // 3. Find or create course
      const [course] = await Course.findOrCreate({
        where: { course_id: courseData.CourseID },
        defaults: {
          name: courseData.CourseName,
          start_date: courseData.start_date,
          end_date: courseData.end_date,
        },
      });

      // 4. Link student to course (prevent duplicates)
      await StudentCourseList.findOrCreate({
        where: {
          user_id: userId,
          course_id: course.id,
        },
      });

      // 5. Create instructor list
      const instructorList = await InstructorList.create({
        course_id: course.id,
      });

      // 6. Insert instructors
      for (const inst of courseData.Instructors) {
        await Instructor.create({
          name: inst.Name,
          email: inst.Email,
          instructor_list_id: instructorList.id,
        });
      }

      // 7. Insert meeting times
      for (const meet of courseData.meeting_times) {
        for (const day of meet.days) {
          await CourseMeet.create({
            meet_day: dayMap[day] || "Unset",
            start_time: formatTime(meet.start_time),
            end_time: formatTime(meet.end_time),
            course_id: course.id,
          });
        }
      }
    }

    res.send({ message: "Schedule fetched and stored successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Error fetching schedule" });
  }
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  logger.debug(`Attempting to delete user: ${id}`);

  User.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        logger.info(`User ${id} deleted successfully`);
        res.send({
          message: "User was deleted successfully!",
        });
      } else {
        logger.warn(`Cannot delete user ${id} - not found`);
        res.send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`,
        });
      }
    })
    .catch((err) => {
      logger.error(`Error deleting user ${id}: ${err.message}`);
      res.status(500).send({
        message: "Could not delete User with id=" + id,
      });
    });
};


export default exports;
