import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// ✅ Register User
export const userRegister = async (req, res) => {
  try {
    const { fullname, email, phone, password } = req?.body;
    console.log(fullname, email, phone, password);

    if (!fullname || !email || !phone || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({
      fullname,
      email,
      phone,
      password,
    });

    const userResponse = await User.findById(user._id).select("-password");

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: userResponse,
    });
  } catch (error) {
    console.log("sign up error: ", error?.message);
    res.status(500).json({ success: false, message: "User signup failed" });
  }
};

 
// export const login = async (req, res) => {
//   try {
//     const { email, password } = req?.body;

//     if (!email || !password) {
//       return res.status(400).json({ message: "Email and password required" });
//     }

//     const user = await User.findOne({ email: email?.trim().toLowerCase() });
//     if (!user) {
//       return res.status(400).json({ message: "Invalid email or password" });
//     }

//     const isMatch = await user.isPasswordCorrect(password);
//     console.log(isMatch, password, user.password);

//     if (!isMatch) {
//       return res.status(400).json({ message: "Invalid email or password" });
//     }

//     // JWT token
//     const token = jwt.sign(
//       { id: user._id, email: user.email },
//       process.env.JWT_SECRET,
//       { expiresIn: "7d" }
//     );

//     const userResponse = await User.findById(user._id).select("-password");

//     res.status(200).json({
//       success: true,
//       message: "Login successful",
//       token,
//       user: userResponse,
//     });
//   } catch (error) {
//     console.log("login error -->", error?.message);
//     res.status(500).json({ success: false, message: "Login failed" });
//   }
// };

 
export const updateProfile = async (req, res) => {
  try {
    const { fullname, phone } = req?.body;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { fullname, phone },
      { new: true }
    ).select("-password");

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.log("update profile error -->", error?.message);
    res.status(500).json({ success: false, message: "Update profile failed" });
  }
};


 

// ✅ Login API with cookie
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const user = await User.findOne({ email: email?.trim().toLowerCase() });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await user.isPasswordCorrect(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    const userResponse = await User.findById(user._id).select("-password");

    // Send token in cookie
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",  
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,  
      })
      .status(200)
      .json({
        success: true,
        message: "Login successful",
        user: userResponse,
      });
    
    console.log(userResponse);
    
  } catch (error) {
    console.log("login error -->", error?.message);
    res.status(500).json({ success: false, message: "Login failed" });
  }
};

// Logout API
export const logout = async (req, res) => {
  try {
    res
      .cookie("token", "", {
        httpOnly: true,
        expires: new Date(0), 
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      })
      .status(200)
      .json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    console.log("logout error -->", error?.message);
    res.status(500).json({ success: false, message: "Logout failed" });
  }
};


// controllers/userController.js
export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch user" });
  }
};


