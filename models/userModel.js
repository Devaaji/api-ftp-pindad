import { DataTypes } from "sequelize";
import db from "../config/Databases.js";

const Users = db.define("users", {
  uid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  username: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
  },
  refresh_token: {
    type: DataTypes.TEXT,
  },
});

export default Users;

(async () => {
  await db.sync();
})();
