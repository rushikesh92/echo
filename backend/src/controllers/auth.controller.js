import User from "../models/User.model.js";
import bcrypt from 'bcryptjs'
import { generateToken } from "../lib/utils.js";

const signup = async (req, res) => {
    try {
        const { email, fullName, password } = req.body;
        if (!email || email.trim() == "") {
            return res.status(400).json({ message: "email is required" });
        }
        if (!fullName || fullName.trim() == "") {
            return res.status(400).json({ message: "fullName is required" });
        }
        if (!password || password.trim().length < 6) {
            return res.status(400).json({ message: "Password with atleast 6 characters is required" });
        }

        const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        const existedUser = await User.findOne({ email });
        if (existedUser) {
            return res.status(400).json({ message: "User with this email already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = await User.create(
            {
                email,
                fullName,
                password: hashedPassword
            }
        );
        if (newUser) {
            generateToken(newUser._id, res);
            res.status(201).json(
                {
                    message: "User registered successfully",
                    data: {
                        _id: newUser._id,
                        email: newUser.email,
                        fullName: newUser.fullName,
                        profPic: newUser.profPic
                    }
                }
            )
        }
        else {
            return res.status(400).json({ message: "Invalid user data" });
        }

    } catch (error) {
        console.log("Error in signup controller: ", error)
        return res.status(500).json({ message: `Internal server error` });

    }
};

const login = async (req, res) => {
    try {
        const {email , password } = req.body;
        if(!email || email.trim()===""){
            return res.status(400).json( { message:"email is required"});
        }
        if(!password || password.trim()===""){
            return res.status(400).json( { message:"password is required"});
        }
        const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }
        const user = await User.findOne({email:email});
        if(!user){
            return res.status(404).json({ message: "User not found" });
        }
        const isValid= await bcrypt.compare(password , user.password);
        if(!isValid){
            return res.status(401).json({ message: "Incorrect password" });
        }

        generateToken(user._id,res);
        res.status(200).json(
                {
                    message: "User logged in successfully",
                    data: {
                        _id: user._id,
                        email: user.email,
                        fullName: user.fullName,
                        profPic: user.profPic
                    }
                }
            )
    } catch (error) {
        console.log("Error in login controller: ", error)
        return res.status(500).json({ message: `Internal server error` }); 
    }
};

const logout = async (req, res) => {
    try {
        return res
            .status(200)
            .clearCookie("jwt", {httpOnly:true , secure:true})
            .json({
                message:"User logged out successfully."
            });
    } catch (error) {
        console.log("Error in logout controller: ", error);
        return res.status(500).json({message:"Internal server error"});
    }
};
export {
    signup,
    login,
    logout
}