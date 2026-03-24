import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes.js';
import linkRoutes from './routes/linkRoutes.js';

const app = express();

app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/link-admin-panel');

app.use('/api/auth', authRoutes);
app.use('/api/link', linkRoutes);

app.listen(5000, () => {
  console.log('Server running on port 5000');
});