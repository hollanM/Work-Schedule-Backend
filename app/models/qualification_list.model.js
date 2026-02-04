import Sequelize from "sequelize";
import SequelizeInstance from "../config/sequelizeInstance.js";
const Qualification_List = SequelizeInstance.define("qualification_lists", {
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        
    },
    //I don't see the purpose of this attribute here.
    //I don't think it will get used. 
    qualification_description: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null,
    },
  });
   
export default Qualification_List;
