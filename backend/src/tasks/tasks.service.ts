import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { Task, TaskDocument } from "./entities/task.entity";

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

  async create(createTaskDto: CreateTaskDto, userId: string): Promise<Task> {
    const createdTask = new this.taskModel({
      ...createTaskDto,
      userId,
    });
    return createdTask.save();
  }

  async findAll(userId: string): Promise<Task[]> {
    return this.taskModel
      .find({ userId })
      .sort({ createdAt: -1 })
      .lean()
      .exec();
  }

  async findOne(id: string, userId: string): Promise<Task | null> {
    return this.taskModel.findOne({ _id: id, userId }).lean().exec();
  }

  async update(
    id: string,
    updateTaskDto: UpdateTaskDto,
    userId: string
  ): Promise<Task | null> {
    return this.taskModel
      .findOneAndUpdate({ _id: id, userId }, updateTaskDto, { new: true })
      .lean()
      .exec();
  }

  async remove(id: string, userId: string): Promise<Task | null> {
    return this.taskModel.findOneAndDelete({ _id: id, userId }).lean().exec();
  }
}
