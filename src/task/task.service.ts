import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';
import { TaskStatus } from './task-status.enum';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';

@Injectable()
export class TaskService {

  constructor(
    @InjectRepository(TaskRepository)
    private readonly taskRepository: TaskRepository,
    ) {}

  getTasks(filterDto: GetTaskFilterDto) {
    return this.taskRepository.getTasks(filterDto);
  }

  async getTaskByID(id: number): Promise<Task> {
    const found = await this.taskRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`The task with "${id}" not found`);
    }
    return found;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto);
  }

  async deleteTaskByID(id: number): Promise<void> {
    const result = await this.taskRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`The task with "${id}" not found`);
    }
  }

  async updateStatusTask(id: number, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskByID(id);

    if (!task) {
      throw new NotFoundException(`The task with "${id}" not found`);
    }

    task.status = status;
    await task.save();

    return task;
  }
}
