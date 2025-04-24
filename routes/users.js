import express from 'express';
import { getUsers,
         createUser,
         getUserById, 
         deleteUser, 
         registerUser,
         loginUser
 } from '../controllers/usersController.js';

const userRouter = express.Router();


// GET all users
userRouter.get('/', getUsers);

//GET single user by id
userRouter.get('/:id', getUserById); 

// POST a new user
userRouter.post('/', createUser);

// Register a new user
userRouter.post('/register', registerUser);

// Log in a new user
userRouter.post('/login', loginUser);

// DELETE a user by id
userRouter.delete('/:id', deleteUser);



export default userRouter;
