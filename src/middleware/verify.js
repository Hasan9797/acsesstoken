import jwt from "jsonwebtoken";
import User from "../model/user.js";

export const verify = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, process.env.JWT_SEC, (err, user) => {
      if (err) {
        return res.status(403).json("Token is not valid!");
      }
      req.user = user;
      next();
    });
  } else {
    res.status(401).json("You are not authenticated!");
  }
};

export const verifyDB = async (req, res, next) => {
  const token = req.headers.authorization;
  const userc = await User.findOne({
    username: req.user.username,
  });
  if (token === userc.acsesstoken) {
    req.user = userc;
    next();
  } else {
    res.status(401).json("You are not authenticated!");
  }
};
