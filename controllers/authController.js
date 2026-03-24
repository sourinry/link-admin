import User from '../models/userModel.js';
import bcrypt from 'bcrypt';
import { generateToken } from '../utils/generateToken.js';

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json({ message: "Invalid password" });
  }

  const token = generateToken(user);

  res.json({
    message: "Login successful",
    token
  });
};