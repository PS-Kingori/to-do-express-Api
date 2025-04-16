import express from 'express';
import { getUsers, createUser } from '../controllers/usersController.js';

const userRouter = express.Router();


// GET all users
userRouter.get('/', getUsers);

// POST a new user
userRouter.post('/', createUser);

export default userRouter;
