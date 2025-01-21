import { Router } from 'express';
import { jwtAuth } from '../middlewares/jwt_auth.js';
import TaskController from '../controllers/tasks.js';

const router = Router();

// Load jwt-auth middleware
router.use(jwtAuth);

router.get('/', TaskController.getTasks);
router.get('/:id', TaskController.getTask);
router.post('/', TaskController.addTask);
router.put('/:id', TaskController.updateTask);
router.patch('/:id/status', TaskController.updateTaskStatus);
router.delete('/:id', TaskController.deleteTask);

export default router;

