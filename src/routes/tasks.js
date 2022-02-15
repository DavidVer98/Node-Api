import {Router} from 'express'
import {getTask, createTask, deleteTask, updateTask, getOneTask, getTaskByProject} from '../controllers/task.controllers'


const router = Router();

router.get('/',getTask);
router.get('/:id', getOneTask);
router.post('/',createTask);
router.delete('/:id',deleteTask);
router.put('/:id', updateTask)
// api/tasks/project/:_projectId
router.get('/project/:projectId',getTaskByProject);
export default router;