import Sequelize from "sequelize";
import SequelizeInstance from "../config/sequelizeInstance.js";

const Schedule = SequelizeInstance.define("schedule", {
    title: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
    published: {
      type: Sequelize.BOOLEAN,
    },
  });
   
export default Schedule;
