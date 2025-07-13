import User from '../models/user.model.js'
import { validationResult } from 'express-validator';

export const apiTest  = async (req, res) => {
    try {
        const result = await User.find();
        res.status(200).json(result);
    } 
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const login  = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: "Invalid data." });
        }
        
        const user = await User.findOne({ email: req.body.email, password: req.body.password }).select("-password");
        if (!user) {
            return res.status(404).json({ error: "User not found!" });
        }

        res.status(200).json(user);
    } 
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const register  = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: "Invalid data." });
        }
        
        const checkUser = await User.findOne({ email: req.body.email });
        if (checkUser) {
            return res.status(409).json({ error: "Email already exists!" });
        }

        const user = {
            ...req.body,
        }

        const result = await User.insertOne(user);
        if (!result) {
            return res.status(500).json({ error: "Error inserting account." });
        }

        
        res.status(200).json({ result });
    } 
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getEmployees = async (req, res) => {
    try {
        const result = await User.find({ role: "employee"});
        res.status(200).json(result);

    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}


export const getProfile = async (req, res) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ error: "Invalid data." });
        }
    
        const user = await User.findOne({ _id : req.body.id }).select('-password');;
        if (!user) {
            return res.status(404).json({ error: "User not found!" });
        }

        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ error : error.message });
    }
}

export const updateProfile = async (req, res) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ error: "Invalid data." });
        }

        const result = await User.findOneAndUpdate({ _id : req.params.id }, {$set : req.body});
        if (!result) {
            return res.status(500).json({ error: "Error updating profile!" });
        }

        res.status(200).json({message : "Update success."});
    }
    catch (error) {
        res.status(500).json({ error : error.message });
    }
}