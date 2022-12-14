import Users from "../models/userModel.js";
import jwt from "jsonwebtoken";

export const refreshToken = async (req, res) => {
  try {
    const authHeader = req.headers["authorization"];
    const refreshToken = authHeader && authHeader.split(" ")[1];

    if (!refreshToken) {
      return res
        .status(401)
        .json({ status: 401, msg: "Authentication Failed" });
    }

    const user = await Users.findAll({
      where: {
        refresh_token: refreshToken,
      },
    });

    if (!user[0]) {
      return res.status(403).json({ status: 403, msg: "Expired Token" });
    }

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err) {
          return res.status(403).json({ status: 403, msg: "Expired Token" });
        }
        const userId = user[0].id;
        const username = user[0].username;
        const accessToken = jwt.sign(
          { userId, username },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: "5s",
          }
        );
        res.json({ accessToken });
      }
    );
  } catch (error) {
    console.log(error);
  }
};
