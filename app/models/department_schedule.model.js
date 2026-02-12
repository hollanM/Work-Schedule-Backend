import Sequelize from "sequelize";
import SequelizeInstance from "../config/sequelizeInstance.js";

const Department_Schedule = SequelizeInstance.define("department_schedules", {
    id: {
      type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    su_schedule: {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: null,
        // foreign key reference to Date_Time table
        /*
        references: {
            model: "date_times",    
            key: "id"
        }
        */
    },
    mo_schedule: {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: null,
        // foreign key reference to Date_Time table
        /*
        references: {
            model: "date_times",    
            key: "id"
        }
        */
    },
    tu_schedule: {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: null,
        // foreign key reference to Date_Time table
        /*
        references: {
            model: "date_times",    
            key: "id"
        }
        */
    },
    we_schedule: {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: null,
        // foreign key reference to Date_Time table
        /*
        references: {
            model: "date_times",    
            key: "id"
        }
        */
    },
    th_schedule: {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: null,
        // foreign key reference to Date_Time table
        /*
        references: {
            model: "date_times",    
            key: "id"
        }
        */
    },
    fr_schedule: {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: null,
        // foreign key reference to Date_Time table
        /*
        references: {
            model: "date_times",    
            key: "id"
        }
        */
    },
    sa_schedule: {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: null,
        // foreign key reference to Date_Time table
        /*
        references: {
            model: "date_times",    
            key: "id"
        }
        */
    }
  });
   
export default Department_Schedule;
