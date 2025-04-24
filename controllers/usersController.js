import User from "../models/user.js";
import bcrypt from "bcrypt";
import bodyParser from "body-parser";

//GET Users

export const getUsers = async (req, res) => {
    try {
    const users = await User.find();
    res.status(200).json(users);
    } catch (err) {
    res.status(500).json({ error: err.message });
    }
    };



// GET single user by id
export const getUserById = async (req, res) => {
    try {
      const { id } = req.params; // Extract the user id from the URL
      const user = await User.findById(id); // Find the user in the database by id
  
      // If no user is found, send a 404 response
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // If user is found, send the user object with a 200 status code
      res.status(200).json(user);
    } catch (err) {
      // Handle potential errors (e.g., invalid id format, connection issues, etc.)
      res.status(500).json({ error: err.message });
    }
  };
  

//POST

export const createUser = async (req, res) => {
    try {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password });

       // Check if a user with the given email already exists
       const existingUser = await User.findOne({ email });
       if (existingUser) {
         return res.status(409).json({
           message: "A user with this email already exists."
         });
       }
    await user.save();
    res.status(201).json(user);
    } catch (err) {
    res.status(500).json({ error: err.message });
    }
    };

    //POST

export const registerUser = async (req, res) => {
  try {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10); // Hash the password

  // Check if a user with the given email already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(409).json({
      message: "A user with this email already exists."
    });
  }

  const user = new User({ name, email, password: hashedPassword });

     
  await user.save();
  res.status(201).json(user);
  } catch (err) {
  res.status(500).json({ error: err.message });
  }
  };


//LOGIN

export const loginUser = async (req, res)=>{

  try {
    const {email, password} = req.body;
    const currentUser = await User.findOne({email});

    if (!currentUser) {
      return res.status(400).json({message: "User not found"});
    } 
    
    const isPasswordValid = await bcrypt.compare( password, currentUser.password);
     if (!isPasswordValid) {
     return res.status(400).json({message: "Password is invalid"})
     };

 return res.status(200).json({message: "logged in succesfully", User: `${currentUser.name}`, bcryptHashed_Password: `${currentUser.password}`})
    
  } catch (error) {
    res.status(400).json({message: "Unable to log in. Try again"})
    
  }

}

    


//DELETE

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params; // Extract the user id from the URL
        const user = await User.findByIdAndDelete(id); // Find the user in the database by id and delete it
        // If no user is found, send a 404 response
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        // If user is found and deleted, send a success message with a 200 status code
        res.status(200).json({ message: "User deleted successfully" });
        
    } catch (error) {
        res.status(500).json({ error: error.message });
        
    }
}