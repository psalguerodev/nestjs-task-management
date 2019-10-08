import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards, UsePipes, ValidationPipe, Logger } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TaskService } from './task.service';

@Controller('task')
@ApiUseTags('task')
@ApiBearerAuth()
@UseGuards(AuthGuard())
export class TaskController {

  private readonly logger = new Logger('TaskController');

  constructor(private readonly taskService: TaskService) { }

  @Get()
  getTasks(
    @GetUser() user: User,
    @Query(ValidationPipe) filterDto: GetTaskFilterDto): Promise<Task[]> {
    this.logger.verbose(`User "${user.username}" retrieving all taks. Filters: ${JSON.stringify(filterDto)}`);
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
    this.logger.verbose(`User "${user.username}" creating task. Data: ${JSON.stringify(createTaskDto)}`);
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
