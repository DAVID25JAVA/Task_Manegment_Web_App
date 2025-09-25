import {
  userRegister,
  login,
  updateProfile,
  logout,
  getCurrentUser,
} from "../controllers/UserController.js";
import { isAuth } from "../middlewares/isAuth.js";
import express from "express";

const userRouter = express.Router();

userRouter.post("/register", userRegister);
userRouter.post("/login", login);
userRouter.put("/update-profile", isAuth, updateProfile);
userRouter.post("/logout", logout);
userRouter.get("/me", isAuth, getCurrentUser)

export default userRouter;
