import { Controller, Get, Param, ParseIntPipe, Body, Post, UsePipes, ValidationPipe, Delete, Patch, Query } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { TaskStatus } from './task-status.enum';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';

@Controller('task')
export class TaskController {

  constructor(private readonly taskService: TaskService) {}

  @Get()
  getTasks(@Query(ValidationPipe) filterDto: GetTaskFilterDto): Promise<Task[]> {
    return this.taskService.getTasks(filterDto);
  }

  @Get('/:id')
  async getTaskByID(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    return this.taskService.getTaskByID(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskService.createTask(createTaskDto);
  }

  @Delete('/:id')
  deleteTaskByID(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.taskService.deleteTaskByID(id);
  }

  @Patch('/:id/status')
  updateStatusTask(@Param('id', ParseIntPipe) id: number,
                   @Body('status', TaskStatusValidationPipe) status: TaskStatus): Promise<Task> {
    return this.taskService.updateStatusTask(id, status);
  }

}
