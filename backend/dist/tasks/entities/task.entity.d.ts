import { Document } from "mongoose";
export declare enum TaskPriority {
    LOW = "low",
    MEDIUM = "medium",
    HIGH = "high"
}
export declare class Task {
    text: string;
    completed: boolean;
    dueDate: Date;
    priority: TaskPriority;
    category: string;
}
export type TaskDocument = Task & Document;
export declare const TaskSchema: import("mongoose").Schema<Task, import("mongoose").Model<Task, any, any, any, Document<unknown, any, Task> & Task & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Task, Document<unknown, {}, import("mongoose").FlatRecord<Task>> & import("mongoose").FlatRecord<Task> & {
    _id: import("mongoose").Types.ObjectId;
}>;
