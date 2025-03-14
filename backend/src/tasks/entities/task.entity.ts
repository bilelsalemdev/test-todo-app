import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema } from "mongoose";
import { User } from "../../auth/entities/user.entity";

export enum TaskPriority {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
}

@Schema({ timestamps: true })
export class Task {
  @Prop({ required: true })
  text: string;

  @Prop({ default: false })
  completed: boolean;

  @Prop()
  dueDate: Date;

  @Prop({ enum: TaskPriority, default: TaskPriority.MEDIUM })
  priority: TaskPriority;

  @Prop()
  category: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: "User", required: true })
  userId: User;
}

export type TaskDocument = Task & Document;
export const TaskSchema = SchemaFactory.createForClass(Task);
