import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './configs/db.js'; // Database connect karne ke liye function
import userRouter from './routes/userRoutes.js'; // User related routes
import resumeRouter from './routes/resumeRoutes.js';
import aiRouter from './routes/airoutes.js'; // AI related routes

const app = express();
const port = process.env.PORT || 3000; // Environment variable se port lega ya default 3000 [3]

// Database Connection
// Is line se server shuru hone se pehle MongoDB connect ho jayega [4]
await connectDB();

// Middlewares
app.use(express.json()); // Request se JSON data read karne ke liye [3]
app.use(cors()); // Frontend ko backend se baat karne ki permission dene ke liye [3]

// Test Route
// Isse aap check kar sakte hain ki server chal raha hai ya nahi
app.get('/', (req, res) => {
    res.send("Server is live");
});

app.use('/api/users', userRouter);
app.use('/api/resumes', resumeRouter);
app.use('/api/AI', aiRouter); 

// Start Server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});