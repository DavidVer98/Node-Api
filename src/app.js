import express, {json} from 'express';
import morgan from 'morgan';
import projectRoutes from './routes/project'
import taskRoutes from './routes/tasks'

const app = express();

//Middleware
app.use(morgan('dev'));
app.use(json());

// routes
app.use('/api/projects',projectRoutes);
app.use('/api/tasks',taskRoutes);



export default app;