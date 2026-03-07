import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import generateToken from "../utils/generateToken.js";
import tokenBlacklistModel from "../models/blacklist.model.js"

export const registerUserController = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        message: "Please provide username, email and password",
      });
    }

    const isUserAlreadyExists = await User.findOne({ email });

    if (isUserAlreadyExists) {
      return res.status(400).json({
        message: "Account already exists with this email or username",
      });
    }
    //convert the password in hash
    const hash = await bcrypt.hash(password, 10);

    //create new user
    const newUser = new User({
      username,
      email,
      password: hash,
    });

    if (newUser) {
      const savedUser = await newUser.save();
      generateToken(savedUser._id, res);
      console.log("User signed up successfully:", savedUser);

      res.status(201).json({
        message: "User registered successfully",
        user: {
            id: savedUser._id,
            username: savedUser.username,
            email: savedUser.email
        }
    })
    }

  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const loginUserController=async(req,res)=>{
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are  required" });
    }

    try{
        const user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({
                message: "Invalid email or password"
            })
        }
        //compair the hash password by bcrypt
        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (!isPasswordValid) {
            return res.status(400).json({
                message: "Invalid email or password"
            })
        }
        generateToken(user._id,res);
        res.status(200).json({
        message: "User loggedIn successfully.",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
        })
    }catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({
        message: "Server Error",
        });
    }
}

export const logoutUserController=async(req,res)=>{
    try{
        const token =req.cookies.token;
        if(token){
            await tokenBlacklistModel.create({token});
        }
        res.clearCookie("token");
        res.status(200).json({message:"User logged out successfully"});

    }catch (error) {
        console.error("Logout Error:", error);
        res.status(500).json({
        message: "Server Error",
        });
    }
}

export const getMeController = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    //if user not found
    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.status(200).json({
      message: "User details fetched successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error"
    });
  }
};

