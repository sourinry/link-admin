import 'dotenv/config';
import express from 'express';
import authRoutes from './routes/authRoutes.js';
import linkRoutes from './routes/linkRoutes.js';
import { connectDB } from './config/db.js';
import cors from "cors"

const app = express();
app.use(cors({
  origin : "http://localhost:4200"
}))
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/link', linkRoutes);


//test API
app.get('/', (req,res) => {
  res.send(`hello from server`);
});

//port form env
const PORT = process.env.PORT ? Number(process.env.PORT) : 5000;

//startServer async function
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, ()=>{
      console.log(`server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(`server failed to load`, error);
  }
}

//start the server
startServer();