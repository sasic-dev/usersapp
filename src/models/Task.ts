import { DataSource, DeleteResult, UpdateResult } from "typeorm";
import { Database } from "../config/database.js";
import { Task } from "../entities/Task.js";

export class TaskModel {
    private datasource: DataSource = Database.getInstance().dataSource;

    async getTasks(userId: number): Promise<Task[] | null> {
        try {
            const result = await this.datasource.getRepository(Task)
                .createQueryBuilder("task")
                .select(["task.id", "task.name", "task.user_id", "task.completed", "task.createdAt", "task.updatedAt"])
                .where("task.user_id = :uid", { uid: userId })
                .getMany();

            return result;

        } catch(err) {
            console.log(err);
            return null;
        }
    }

    async getTask(id: number): Promise<Task | null> {
        try {
            const result = await this.datasource.getRepository(Task)
                .createQueryBuilder("task")
                .select(["task.id", "task.name", "task.user_id", "task.completed", "task.createdAt", "task.updatedAt"])
                .where("task.id = :task_id", { task_id: id})
                .getOne();

            return result;

        } catch(err) {
            console.log(err);
            return null;
        }
    }

    async createTask(task: Task): Promise<number | null> {
        try {
            const result = await this.datasource.getRepository(Task)
                .createQueryBuilder()
                .insert()
                .into(Task)
                .values(task)
                .execute();

            return result.identifiers[0].id;
        } catch(err) {
            console.log(err);
            return null;
        }
        
    }

    async updateTask(id: number, taskName: string): Promise<Boolean | null> {
        try {
            await this.datasource.getRepository(Task)
                .createQueryBuilder()
                .update()
                .set({ name: taskName })
                .where("id = :task_id", { task_id: id})
                .execute();

            return true;

        } catch(err) {
            console.log(err);
            return null;
        }
    }

    async updateTaskStatus(id: number, status: string): Promise<boolean | null> {
        try {
            const result = await this.datasource.getRepository(Task)
                .createQueryBuilder()
                .update()
                .set({ completed: status})
                .where("id = :task_id", { task_id: id})
                .execute();

            return result.affected ? true : null;
        } catch(err) {
            console.log(err);
            return null;
        }
    }

    async deleteTask(id: number): Promise<boolean | null> {
        try {
            const result = await this.datasource.getRepository(Task)
                .createQueryBuilder()
                .delete()
                .where("id = :task_id", { task_id: id})
                .execute();

            return result.affected ? true : null;
        } catch(err) {
            console.log(err);
            return null;
        }
    }
}