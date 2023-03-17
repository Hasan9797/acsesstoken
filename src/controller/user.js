import User from "../model/user.js";
import jwt from "jsonwebtoken";

export const Register = async (req, res) => {
  try {
    const currentUser = await User.findOne({
      username: req.body.username,
    });
    if (!currentUser) {
      const user = new User(req.body);
      const newuser = await user.save();
      res
        .status(200)
        .json({ message: "User addet Sucsessfuly", data: newuser });
    } else {
      res.json({
        message: "this user exists!! please enter User name",
      });
    }
  } catch (error) {
    res.status(401).json({ error: error.message });
    console.log(error);
  }
};

export const Login = async (req, res) => {
  try {
    const user = await User.findOne({
      username: req.body.username,
    });

    !user && res.status(401).json("Wrong User Name");

    user.password !== req.body.password &&
      res.status(401).json("Wrong Password");

    const accessToken = jwt.sign(
      {
        username: user.username,
        phoneNumber: user.phounNumber,
      },
      process.env.JWT_SEC,
      { expiresIn: "3d" }
    );

    const refreshToken = jwt.sign(
      {
        username: user.username,
        phoneNumber: user.phounNumber,
      },
      process.env.JWT_SEC_REF,
      { expiresIn: "3d" }
    );

    await User.updateOne(
      { _id: user._id },
      {
        $set: {
          acsesstoken: accessToken,
          refreshToken: refreshToken,
        },
      }
    );

    res.status(200).json({ accessToken, refreshToken });
  } catch (err) {
    res.status(500).json(err);
  }
};

export const Logout = async (req, res) => {
  try {
    await User.updateOne(
      { username: req.user.username },
      {
        $set: {
          acsesstoken: "",
        },
      }
    );
    res.status(200).json({ message: "OK" });
  } catch (err) {
    res.status(500).json(err);
  }
};

export const RefreshToken = async (req, res) => {
  const refreshToken = jwt.sign(
    {
      username: req.user.username,
      phoneNumber: req.user.phounNumber,
    },
    process.env.JWT_SEC_REF,
    { expiresIn: "3d" }
  );

  await User.updateOne(
    { username: req.user.username },
    {
      $set: {
        refreshToken: refreshToken,
      },
    }
  );

  res.status(200).json({ message: "Successfly refresh token", refreshToken });
};
