import { Router } from "express";
import userRouter from './users.js';
import taskRouter from './tasks.js';

const router = Router();

router.get('/', (req, res) => {
    res.status(200).json({
        "message": "task management api"
    });
}); 
router.use('/users', userRouter); 
router.use('/tasks', taskRouter);

export default router;