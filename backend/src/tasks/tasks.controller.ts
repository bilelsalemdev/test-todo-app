import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from "@nestjs/common";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { TasksService } from "./tasks.service";

@Controller("tasks")
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Request() req, @Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto, req.user._id);
  }

  @Get()
  findAll(@Request() req) {
    return this.tasksService.findAll(req.user._id);
  }

  @Get(":id")
  findOne(@Request() req, @Param("id") id: string) {
    return this.tasksService.findOne(id, req.user._id);
  }

  @Patch(":id")
  update(
    @Request() req,
    @Param("id") id: string,
    @Body() updateTaskDto: UpdateTaskDto
  ) {
    return this.tasksService.update(id, updateTaskDto, req.user._id);
  }

  @Delete(":id")
  remove(@Request() req, @Param("id") id: string) {
    return this.tasksService.remove(id, req.user._id);
  }
}
