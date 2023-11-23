import cors from 'cors';
import express from 'express';
import { userRoutes } from './modules/user/user.route';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/users', userRoutes);

export default app;
