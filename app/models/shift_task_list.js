import Sequelize from "sequelize";
import SequelizeInstance from "../config/sequelizeInstance.js";

const Shift_Task_List = SequelizeInstance.define("shift_task_lists", {
    //primary key for the table
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    //-----FOREIGN KEY ATTRIBUTES FIRST-----
   department_id:{
    type: Sequelize.INTEGER,
    allowNull: true,
    //foreign key constraint for departments table
   /*
    references:{
      model: "departments",
      key: "id",    
    }
      */
   }
  });

export default Shift_Task_List;
