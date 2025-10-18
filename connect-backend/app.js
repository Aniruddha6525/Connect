import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

// import forumRoutes from './routes/forum.routes.js';
import eventRoutes from './routes/event.routes.js';
import userRoutes from './routes/user.routes.js';

const app = express();
app.use(cors());
app.use(express.json());

// app.use('/api/forums', forumRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT , () => console.log(`Server running on port ${PORT}`));


