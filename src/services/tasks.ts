import { TaskModel } from "../models/Task.js";
import { Task } from '../entities/Task.js';
import { ServiceResponse } from "../interfaces/common.js";
import { getErrorMessage } from "../utils/error_handler.js";

export class TaskService {
    private taskModel: TaskModel;

    constructor() {
        this.taskModel = new TaskModel();
    }

    public async createTask(name: string, userId: number): Promise<ServiceResponse> {
        try {
            const taskObj = new Task();
            taskObj.name = name;
            taskObj.userId = userId;

            const taskId = await this.taskModel.createTask(taskObj);
            if(!taskId) {
                return {
                    "status": false,
                    "message": "task is not created!"
                };
            }

            return {
                "status": true,
                "taskId": taskId
            };
        } catch(err) {
            return {
                status: false,
                message: getErrorMessage(err, "An error occurred during addTask.")
            };
        }
    }

    public async getTasks(userId: number): Promise<ServiceResponse> {

        try {

            const tasks = await this.taskModel.getTasks(userId);
            if(!tasks) {
                return {
                    "status": false,
                    "message": "tasks are not available!"
                };
            }

            return {
                "status": true,
                "tasks": tasks
            };
        } catch(err) {
            return {
                status: false,
                message: getErrorMessage(err, "An error occurred during getTasks")
            };
        }
    }

    public async getTask(id: number): Promise<ServiceResponse> {

        try {

            const task = await this.taskModel.getTask(id);
            if(!task) {
                return {
                    "status": false,
                    "message": "task is not available!"
                };
            }

            return {
                "status": true,
                "task": task
            };
        } catch(err) {
            return {
                status: false,
                message: getErrorMessage(err, "An error occurred during getTask")
            };
        }
    }

    public async addTask(name: string, userId: number): Promise<ServiceResponse> {

        try {
            const task = new Task();
            task.name = name;
            task.userId = userId;

            const add = await this.taskModel.createTask(task);
            if(!add) {
                return {
                    "status": false,
                    "message": "task is not added!"
                };
            }

            return {
                "status": true,
                "message": "Task added"
            };
        } catch(err) {
            return {
                status: false,
                message: getErrorMessage(err, "An error occurred during addTask")
            };
        }
    }

    public async updateTask(id: number, name: string): Promise<ServiceResponse> {

        try {
            const task = await this.taskModel.getTask(id);
            if(!task) {
                return {
                    "status": false,
                    "message": "task is not available!"
                };
            }

            const update = await this.taskModel.updateTask(id, name);
            if(!update) {
                return {
                    "status": false,
                    "message": "task is not updated!"
                };
            }

            return {
                "status": true,
                "message": "Task updated"
            };
        } catch(err) {
            return {
                status: false,
                message: getErrorMessage(err, "An error occurred during updateTask")
            };
        }
    }

    public async updateTaskStatus(id: number, status: string): Promise<ServiceResponse> {

        try {
            const task = await this.taskModel.getTask(id);
            if(!task) {
                return {
                    "status": false,
                    "message": "task is not available!"
                };
            }

            const update = await this.taskModel.updateTaskStatus(id, status);
            if(!update) {
                return {
                    "status": false,
                    "message": "task is not updated!"
                };
            }

            return {
                "status": true,
                "message": "Task updated"
            };
        } catch(err) {
            return {
                status: false,
                message: getErrorMessage(err, "An error occurred during updateTask")
            };
        }
    }

    public async deleteTask(id: number): Promise<ServiceResponse> {

        try {

            const task = await this.taskModel.deleteTask(id);
            if(!task) {
                return {
                    "status": false,
                    "message": "task is not available!"
                };
            }

            return {
                "status": true,
                "message": "Task deleted"
            };
        } catch(err) {
            return {
                status: false,
                message: getErrorMessage(err, "An error occurred during authenticate task")
            };
        }
    }
}