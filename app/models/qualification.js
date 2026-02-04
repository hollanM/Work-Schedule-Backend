import Sequelize from "sequelize";
import SequelizeInstance from "../config/sequelizeInstance.js";

const Qualification = SequelizeInstance.define("qualifications", {
    id:{
        type: Sequelize.INTEGER,
        authoIncrement: true,
        primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
    employee_id:{
        type: Sequelize.INTEGER,
        allowNull: true,
        //foreign key reference to employees table
        /*
        references: {
            model: "employees",
            key: "id",
        },
        */
    },
    qualification_list_id:{
        type: Sequelize.INTEGER,
        allowNull: true,
        //foreign key reference to qualification_lists table
        references: {
            model: "qualification_lists",
            key: "id",
        },
    }
  });
   
export default Qualification;
