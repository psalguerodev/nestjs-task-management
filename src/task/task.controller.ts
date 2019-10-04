import { Controller, Get, Param, ParseIntPipe, Body, Post, UsePipes,
         ValidationPipe, Delete, Patch, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TaskService } from './task.service';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { TaskStatus } from './task-status.enum';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { User } from '../auth/user.entity';
import { GetUser } from '../auth/get-user.decorator';

@Controller('task')
@UseGuards(AuthGuard())
export class TaskController {

  constructor(private readonly taskService: TaskService) {}

  @Get()
  getTasks(
    @GetUser() user: User,
    @Query(ValidationPipe) filterDto: GetTaskFilterDto): Promise<Task[]> {
    return this.taskService.getTasks(filterDto, user);
  }

  @Get('/:id')
  async getTaskByID(
    @GetUser() user: User,
    @Param('id', ParseIntPipe) id: number): Promise<Task> {
    return this.taskService.getTaskByID(id, user);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(
    @GetUser() user: User,
    @Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskService.createTask(createTaskDto, user);
  }

  @Delete('/:id')
  deleteTaskByID(
    @GetUser() user: User,
    @Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.taskService.deleteTaskByID(id, user);
  }

  @Patch('/:id/status')
  updateStatusTask(
    @GetUser() user: User,
    @Param('id', ParseIntPipe) id: number,
    @Body('status', TaskStatusValidationPipe) status: TaskStatus): Promise<Task> {
    return this.taskService.updateStatusTask(id, status, user);
  }

}
