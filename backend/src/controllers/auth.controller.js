import { generateToken } from "../lib/utils.js"
import User from "../models/user.model.js"
import bycrypt from "bcryptjs"

export const signup = async (req, res) => {
    const {fullName, email, password} = req.body
    try {
        //hash password

        if(!fullName || !email || !password) {
            return res.status(400).json({ message: "All fields are required" })
        }
        if(password.length < 6){
            return res.status(400).json({ message: "Password must be at least 6 characters" })
        }

        const user = await User.findOne({email})

        if(user) return res.status(400).json({message: "Email already exists"})

        const salt = await bycrypt.genSalt(10)
        const hashedPassword = await bycrypt.hash(password, salt)

        const newUser = new User({
            fullName:fullName,
            email:email,
            password:hashedPassword
        })

        if(newUser) {
            // generate jwt token here
            generateToken(newUser._id, res)
            await newUser.save()

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic,
            })

        } else {
            res.status(400).json({message: "Invalid user data"})
        }

    } catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({message: "Internal Server Error"})
    }
}

export const login = (req, res) => {
    res.send("login route")
}

export const logout = (req, res) => {
    res.send("logout route")
}