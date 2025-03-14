import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpException,
} from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";

@Controller("tasks")
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async create(@Body() createTaskDto: CreateTaskDto) {
    try {
      return await this.tasksService.create(createTaskDto);
    } catch (error) {
      throw new HttpException("Failed to create task", HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.tasksService.findAll();
    } catch (error) {
      throw new HttpException(
        "Failed to fetch tasks",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    try {
      const task = await this.tasksService.findOne(id);
      if (!task) {
        throw new HttpException("Task not found", HttpStatus.NOT_FOUND);
      }
      return task;
    } catch (error) {
      throw new HttpException(
        "Failed to fetch task",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Patch(":id")
  async update(@Param("id") id: string, @Body() updateTaskDto: UpdateTaskDto) {
    try {
      const task = await this.tasksService.update(id, updateTaskDto);
      if (!task) {
        throw new HttpException("Task not found", HttpStatus.NOT_FOUND);
      }
      return task;
    } catch (error) {
      throw new HttpException(
        "Failed to update task",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    try {
      const task = await this.tasksService.remove(id);
      if (!task) {
        throw new HttpException("Task not found", HttpStatus.NOT_FOUND);
      }
      return task;
    } catch (error) {
      throw new HttpException(
        "Failed to delete task",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
