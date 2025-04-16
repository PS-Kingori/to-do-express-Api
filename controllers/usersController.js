import User from "../models/user.js";

//GET Users

export const getUsers = async (req, res) => {
    try {
    const users = await User.find();
    res.status(200).json(users);
    } catch (err) {
    res.status(500).json({ error: err.message });
    }
    };

//POST

export const createUser = async (req, res) => {
    try {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password });
    await user.save();
    res.status(201).json(user);
    } catch (err) {
    res.status(500).json({ error: err.message });
    }
    };