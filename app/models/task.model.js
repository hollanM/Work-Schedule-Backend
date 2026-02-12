import Sequelize from "sequelize";
import SequelizeInstance from "../config/sequelizeInstance.js";

const Task = SequelizeInstance.define("tasks", {
    //primary key for the table
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    //-----FOREIGN KEY ATTRIBUTES FIRST-----
    /*
    I have commented out the 
    references to foreign keys, since
    in my branch they don't exist yet. They will need
    to be uncommented when the other models are created.
     */
   shift_task_list_id:{
    type: Sequelize.INTEGER,
    allowNull: true,
    
    //foreign key constraint for shift_task_lists table
   /* 
    references:{
      model: "shift_task_lists",
      key: "id",
    }

    */
   },
   
   //this is the end of the foreign key references. 
   //Below this are all the other non foriegn key attributes of the shift model.
  status:{
    type: Sequelize.BOOLEAN,
    allowNull: true,
    defaultValue: false, //tasks start as incomplete
  },
    description:{
    type: Sequelize.STRING,
    allowNull: true,
  },
  name:{
    type: Sequelize.STRING,
    allowNull: true,
  },
  },
  {
    timestamps: false
  });

export default Task;