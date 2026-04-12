import Sequelize from "sequelize";
import SequelizeInstance from "../config/sequelizeInstance.js";

//this comment exists for another merge!
const Shift = SequelizeInstance.define("shifts", {
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
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: true, //employees can be null, since a shift can be unassigned.
      //foreign key reference to employees table
      
      references: {
        model: "users",
        key: "id",
    },
    
    },
   //id of the date time associated with the shift (will need to be a nested query)
   start_day_id:{
    type: Sequelize.INTEGER,
    allowNull: true, //you might want to set this as false later.
    //foreign key constraint for date_times table
    
    references:{
      model: "date_times",
      key: "id",
    }
      
   },

   end_day_id:{
    type: Sequelize.INTEGER,
    allowNull: true, //you might want to set this as false later.
    //foreign key constraint for date_times table
    
    references:{
      model: "date_times",
      key: "id",
    }
      
   },
   position_id:{
    type: Sequelize.INTEGER,
    allowNull: true,
    //foreign key constraint for positions table
    
    references:{
      model: "positions",
      key: "id",
    }
      
   },
   shift_task_list_id:{
    type: Sequelize.INTEGER,
    allowNull: true,
    defaultValue: null,
    
    //foreign key constraint for shift_task_lists table
   
    references:{
      model: "shift_task_lists",
      key: "id",
    }

    
   },
   department_id:{
    type: Sequelize.INTEGER,
    allowNull: true,
    defaultValue: null,
    
    //foreign key constraint for shift_task_lists table
   
    references:{
      model: "departments",
      key: "id",
    }

    
   },
   weekly_schedule_id:{
    type: Sequelize.INTEGER,
    allowNull: true,
    //foreign key constraint for weekly_schedules table
    
    references:{
      model: "weekly_schedules",
      key: "id",
    }
    
   },

      qualification_list_id:{
    type: Sequelize.INTEGER,
    allowNull: true,
    //foreign key constraint for weekly_schedules table
    
    references:{
      model: "qualification_lists",
      key: "id",
    }
    
   },
   //this is the end of the foreign key references. 
   //Below this are all the other non foriegn key attributes of the shift model.
   open_to_take:{
    type: Sequelize.BOOLEAN,
    allowNull: true,
    defaultValue: true,//most shifts are open when they are made.
   },

   swap_history:{
    type: Sequelize.STRING,
    allowNull: true,   
  },
  is_template:{
    type: Sequelize.BOOLEAN,
    allowNull: true,
    defaultValue: false,//not all schedules are templates, so it can start as false.
  },
  has_gone_on_break:{
    type: Sequelize.BOOLEAN,
    allowNull: true,
    defaultValue: false,//most shifts start with the employee not on break.
  },

  color:{
    type: Sequelize.STRING,
    allowNull: true,
    defaultValue: null,
  },
  published:{
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
  
  });

export default Shift;
