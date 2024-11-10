import { DataTypes } from "sequelize";
import { sequelize } from '../dbconfig.js';

const Visitor = sequelize.define("Visitor", {
  ip: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  network: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

export default Visitor;
