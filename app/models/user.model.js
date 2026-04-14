import Sequelize from "sequelize";
import SequelizeInstance from "../config/sequelizeInstance.js";

const User = SequelizeInstance.define("user", {
  
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  department_id:{
    type: Sequelize.INTEGER,
    allowNull: true,
    defaultValue: null,
    references:{
      model: "departments",
      key: "id"
    }
  },
  fName: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  lName: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: true,
    defaultValue: null
  },
  //-From Julian: I'm not sure what this is, or why it's here,
  //so I'm not touching it. 
  // refresh_token: {
  //   type: Sequelize.STRING(512),
  //   allowNull: true
  // },
  // expiration_date: {
  //   type: Sequelize.DATE,
  //   allowNull: true
  // },

  role:{
    type: Sequelize.ENUM("Manager", "Employee"),
    allowNull: false,
    defaultValue: "Employee",
  },
      phone_num: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null
      },
      oc_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: null
      },
      pay_rate: {
        type: Sequelize.FLOAT,
        allowNull: true,
        defaultValue: 8.75
      },
      clocked_in: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      manager_notes: {
        type: Sequelize.TEXT,
        allowNull: true,
        defaultValue: null
      }
},
{
  timestamps: false, //if the tables are missing and this is not here, it will just error
});

export default User;

