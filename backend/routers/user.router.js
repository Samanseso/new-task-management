import express from 'express';
import { param, body } from 'express-validator';

import {
    apiTest,
    login,
    register,
    getEmployees,
    getProfile,
    updateProfile
} from '../controllers/user.controller.js';

const userRouter = express.Router();

userRouter.get("/", apiTest);

userRouter.get("/employees", getEmployees);

userRouter.post("/login", [
    body("email").isEmail().notEmpty().escape(), 
    body("password").notEmpty().escape()
], login);

userRouter.post("/register", [
    body("name").notEmpty().escape(),
    body("email").isEmail().notEmpty(), 
    body("password").notEmpty()
], register);

userRouter.get("/profile", 
    body("id").notEmpty().isMongoId().escape(),
getProfile)

userRouter.patch("/:id", 
    param("id").notEmpty().escape(),
updateProfile);

export default userRouter