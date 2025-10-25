import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

// import forumRoutes from './routes/forum.routes.js';
import eventRoutes from './routes/event.routes.js';
import userRoutes from './routes/user.routes.js';
import forumRoutes from './routes/forum.routes.js';
import projectRoutes from './routes/project.routes.js';
import mentorshipRoutes from './routes/mentorship.routes.js';
import webinarRoutes from './routes/webinar.routes.js';

const app = express();
app.use(
  cors({
    origin: [
      "https://connect-ruddy-five.vercel.app", // ✅ Vercel deployed site
      "http://localhost:5173",                 
    ],
    methods: ["GET", "POST", "PUT", "DELETE","PATCH", "OPTIONS"],
    credentials: true, 
  })
);

app.use(express.json());

// app.use('/api/forums', forumRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/users', userRoutes);
app.use('/api/forums', forumRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/mentorships', mentorshipRoutes);
app.use('/api/webinars', webinarRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT , () => console.log(`Server running on port ${PORT}`));


