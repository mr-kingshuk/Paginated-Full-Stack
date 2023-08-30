import express from 'express';

//controllers
import createUser from "../controllers/UserController/createUser.js";
import deleteUser from "../controllers/UserController/deleteUser.js";
import getPaginatedUsers from "../controllers/UserController/getPaginatedUsers.js";
import updateUser from "../controllers/UserController/updateUser.js";

const userRouter = express.Router();

userRouter.get('/', getPaginatedUsers);

userRouter.post('/', createUser);

userRouter.patch('/:id', updateUser);

userRouter.delete('/:id', deleteUser);

export default userRouter;