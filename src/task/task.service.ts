import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import * as uuid from 'uuid/v1';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';

@Injectable()
export class TaskService {
  private tasks: Task[] = [];

  getAllTasks() {
    return this.tasks;
  }

  getTaskByFilters(filterDto: GetTaskFilterDto): Task[] {
    const { status, search } = filterDto;
    let tasks = this.getAllTasks();

    if (status) {
      tasks = tasks.filter(t => t.status === status);
    }

    if (search) {
      tasks = tasks.filter(t => t.description.includes(search) || t.title.includes(search) );
    }

    return tasks;
  }

  getTaskById(id: string): Task {
    const task = this.tasks.find(t => t.id === id);

    if (!task) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    return task;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      title,
      description,
      status: TaskStatus.OPEN,
      id: uuid(),
    };

    this.tasks.push(task);
    return task;
  }

  deleteTaskById(id: string): void {
    const found = this.getTaskById(id);

    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    this.tasks = this.tasks.filter(t => t.id !== found.id);
  }

  updateStatusTask(id: string, status: TaskStatus): Task {
    const taskByID = this.getTaskById(id);
    taskByID.status = status;
    return taskByID;
  }

}
