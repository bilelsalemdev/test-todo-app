import { TaskPriority } from "../entities/task.entity";
export declare class CreateTaskDto {
    text: string;
    dueDate?: Date;
    priority?: TaskPriority;
    category?: string;
    completed?: boolean;
}
