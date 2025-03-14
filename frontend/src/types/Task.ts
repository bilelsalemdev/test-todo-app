export enum TaskPriority {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
}

export interface Task {
  _id: string;
  text: string;
  completed: boolean;
  dueDate?: Date;
  priority: TaskPriority;
  category?: string;
  createdAt: Date;
  updatedAt: Date;
}
