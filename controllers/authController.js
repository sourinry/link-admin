import User from '../models/userModel.js';
import bcrypt from 'bcrypt';
import { generateToken } from '../utils/generateToken.js';

// ================= REGISTER =================
export const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. validation
    if (!email || !password) {
      return res.status(400).json({
        status: false,
        message: "Email and password are required"
      });
    }

    // 2. check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        status: false,
        message: "User already exists"
      });
    }

    // 3. hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. create user
    const user = await User.create({
      email,
      password: hashedPassword
    });

    // 5. generate token
    const token = generateToken(user);

    res.status(201).json({
      status: true,
      message: "User registered successfully",
      data: {
        token,
        user: {
          id: user._id,
          email: user.email
        }
      }
    });

  } catch (error) {
    console.error("Register Error:", error);

    res.status(500).json({
      status: false,
      message: "Internal server error"
    });
  }
};


// ================= LOGIN =================
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. validation
    if (!email || !password) {
      return res.status(400).json({
        status: false,
        message: "Email and password are required"
      });
    }

    // 2. find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        status: false,
        message: "Invalid credentials"
      });
    }

    // 3. compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        status: false,
        message: "Invalid credentials"
      });
    }

    // 4. generate token
    const token = generateToken(user);

    res.status(200).json({
      status: true,
      message: "Login successful",
      data: {
        token,
        user: {
          id: user._id,
          email: user.email
        }
      }
    });

  } catch (error) {
    console.error("Login Error:", error);

    res.status(500).json({
      status: false,
      message: "Internal server error"
    });
  }
};


//====================== LOGOUT =====================
export const logout = async (req,res) => {
  try {
    return res.status(200).json({
      status: true,
      message: `user log out successfully`
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: `internal server error`
    });
  }
}