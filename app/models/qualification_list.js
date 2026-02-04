import Sequelize from "sequelize";
import SequelizeInstance from "../config/sequelizeInstance.js";
const Qualification_List = SequelizeInstance.define("qualification_lists", {
    id:{
        type: Sequelize.INTEGER,
        authoIncrement: true,
        primaryKey: true,
    },
    //I don't see the purpose of this attribute here.
    //I don't think it will get used. 
    qualifications: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  });
   
export default Qualification_List;
