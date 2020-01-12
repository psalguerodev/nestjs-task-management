import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';
import { TaskStatus } from './task-status.enum';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { User } from '../auth/user.entity';

@Injectable()
export class TaskService {

  constructor(
    @InjectRepository(TaskRepository)
    private readonly taskRepository: TaskRepository,
  ) { }

  getTasks(filterDto: GetTaskFilterDto, user: User) {
    return this.taskRepository.getTasks(filterDto, user);
  }

  async getTaskByID(id: number, user: User): Promise<Task> {
    const found = await this.taskRepository.findOne({ where: { id, userId: user.id } });
    if (!found) {
      throw new NotFoundException(`The task with "${id}" not found`);
    }
    return found;
  }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto, user);
  }

  async deleteTaskByID(id: number, user: User): Promise<void> {
    const result = await this.taskRepository.delete({ id, userId: user.id });

    if (result.affected === 0) {
      throw new NotFoundException(`The task with "${id}" not found`);
    }
  }

  async updateStatusTask(id: number, status: TaskStatus, user: User): Promise<Task> {
    const task = await this.getTaskByID(id, user);

    if (!task) {
      throw new NotFoundException(`The task with "${id}" not found`);
    }

    task.status = status;
    await task.save();

    return task;
  }
}
