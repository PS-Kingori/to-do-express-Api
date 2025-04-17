import express from 'express';
import { getUsers, createUser, getUserById, deleteUser } from '../controllers/usersController.js';

const userRouter = express.Router();


// GET all users
userRouter.get('/', getUsers);

//GET single user by id
userRouter.get('/:id', getUserById); 

// POST a new user
userRouter.post('/', createUser);

// DELETE a user by id
userRouter.delete('/:id', deleteUser);



export default userRouter;
