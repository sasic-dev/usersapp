import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import { TaskService } from "../services/tasks.js"; 

const getTasks = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId: number = (req.query?.user_id) ? Number(req.query.user_id) : 0;
        await Joi.object({
            "user_id": Joi.number().required(),
        }).validateAsync(req.query);

        const taskService = new TaskService();
        const { status, message, tasks } = await taskService.getTasks(userId);
        if(!status) {
            return res.status(203).json({
                "message": message ?? "",
            });
        }

        if(tasks.length == 0) {
            return res.status(200).json({
                "message": "Tasks are not available"
            });
        } else {
            return res.status(200).json({
                "message": "Tasks are available",
                "tasks": tasks
            });
        }
        
    } catch(err) {
        next(err);
    }
}

const getTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id ? Number(req.params.id) : 0;
        await Joi.object({
            "id": Joi.number().required(),
        }).validateAsync(req.params);

        const taskService = new TaskService();
        const { status, message, task } = await taskService.getTask(id);
        if(!status) {
            return res.status(203).json({
                "message": message ?? "",
            });
        }

        return res.status(200).json({
            "message": "Task available",
            "task": task
        });
    } catch(err) {
        next(err);
    }
}

const addTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await Joi.object({
            "name": Joi.string().required(),
            "user_id": Joi.number().required(),
        }).validateAsync(req.body);

        const taskService = new TaskService();
        const { status, message } = await taskService.addTask(req.body.name, req.body.user_id);
        if(!status) {
            return res.status(203).json({
                "message": message ?? "",
            });
        }

        return res.status(200).json({
            "message": "Task added",
        });
    } catch(err) {
        next(err);
    }
}

const updateTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id ? Number(req.params.id) : 0;
        await Joi.object({
            "id": Joi.number().required(),
            "name": Joi.string().required(),
        }).validateAsync({
            id: req.params.id,
            name: req.body.name
        });

        const taskService = new TaskService();
        const { status, message } = await taskService.updateTask(id, req.body.name);
        if(!status) {
            return res.status(203).json({
                "message": message ?? "",
            });
        }

        return res.status(200).json({
            "message": "Task updated"
        });
    } catch(err) {
        next(err);
    }
}

const updateTaskStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id ? Number(req.params.id) : 0;
        await Joi.object({
            "id": Joi.number().required(),
            "status": Joi.number().required(),
        }).validateAsync({
            id: req.params.id,
            status: req.body.status
        });

        const taskService = new TaskService();
        const { status, message } = await taskService.updateTaskStatus(id, req.body.status);
        if(!status) {
            return res.status(203).json({
                "message": message ?? "",
            });
        }

        return res.status(200).json({
            "message": "Task status updated"
        });
    } catch(err) {
        next(err);
    }
}

const deleteTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await Joi.object({
            "id": Joi.number().required(),
        }).validateAsync(req.body);

        const taskService = new TaskService();
        const { status, message } = await taskService.deleteTask(req.body.id);
        if(!status) {
            return res.status(203).json({
                "message": message ?? "",
            });
        }

        return res.status(200).json({
            "message": "Task deleted"
        });
    } catch(err) {
        next(err);
    }
}

export default {
    getTasks,
    getTask,
    addTask,
    updateTask,
    updateTaskStatus,
    deleteTask
}
