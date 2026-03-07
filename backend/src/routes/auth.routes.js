import express from "express";
import { getMeController, loginUserController, logoutUserController, registerUserController } from "../controllers/auth.controller.js";
import { authUser } from "../middlewares/auth.middleware.js";

const authRouter=express.Router();

authRouter.post("/register",registerUserController);
authRouter.post("/login",loginUserController);
authRouter.post("/logout",logoutUserController);
authRouter.get("/get-me",authUser,getMeController);


export default authRouter;