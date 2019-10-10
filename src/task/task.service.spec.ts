import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { User } from '../auth/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { TaskStatus } from './task-status.enum';
import { TaskRepository } from './task.repository';
import { TaskService } from './task.service';

const mockUser  = { username: 'psalguerodev', id: 12 };

const mockTaskRepository = () => ({
  getTasks: jest.fn(),
  findOne: jest.fn(),
  createTask: jest.fn(),
  delete: jest.fn(),
  save: jest.fn(),
});

describe('TaskService', () => {
  let taskService: TaskService;
  let taskRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TaskService,
        { provide: TaskRepository, useFactory: mockTaskRepository },
      ],
    }).compile();

    taskService = await module.get<TaskService>(TaskService);
    taskRepository = await module.get<TaskRepository>(TaskRepository);

  });

  describe('getTask', () => {
    it('get all tasks from the repository', async () => {
      taskRepository.getTasks.mockResolvedValue('some value');
      expect(taskRepository.getTasks).not.toHaveBeenCalled();

      const filterDto: GetTaskFilterDto = { status: TaskStatus.IN_PROGRESS, search: 'Some search query' };
      // call taskService.getTasks
      const tasks = await taskService.getTasks(filterDto, mockUser as User);
      expect(taskRepository.getTasks).toHaveBeenCalled();
      expect(tasks).toEqual('some value');
      // expect taskRepository.getTasks TO HAVE BEEN CALLED

    });
  });

  describe('getTaskById', () => {
    it('calls taskRepository.findOne() and succesfully retrieve and return the task', async () => {
      const mockTask = { title: 'Title task', description: 'Description task' };
      taskRepository.findOne.mockResolvedValue(mockTask);
      const task = await taskService.getTaskByID(1, mockUser as User);

      expect(task).toEqual(mockTask);
      expect(taskRepository.findOne).toHaveBeenCalledWith({ where: { id: 1, userId: mockUser.id } });
    });

    it('throws an error as task it not found', () => {
      taskRepository.findOne.mockResolvedValue(null);
      expect(taskService.getTaskByID(1, mockUser as User)).rejects.toThrow(NotFoundException);
    });
  });

  describe('createTask', () => {
    it('calls taskrepository.save() and succesfully create and reuturn the task with id', async () => {
      const mockTask = { id: 320, title: 'Title Task', description: 'Description task' };

      expect(taskRepository.createTask).not.toHaveBeenCalled();

      taskRepository.createTask.mockResolvedValue(mockTask);
      const createTaskDto = { title: 'Title Task', description: 'Description task' } as CreateTaskDto;
      const newtask = await taskService.createTask(createTaskDto, mockUser as User);

      expect(newtask).toEqual(mockTask);
      expect(taskRepository.createTask).toHaveBeenLastCalledWith(createTaskDto, mockUser);

    });
  });

  describe('deleteTaskById', () => {
    it('calls taskrepository.delete() and successfully to delete a task without exceptions', async () => {
      expect(taskRepository.delete).not.toHaveBeenCalled();

      taskRepository.delete.mockResolvedValue({ affected: 1, message: 'Deleted' });
      await taskService.deleteTaskByID(1, mockUser as User);

      expect(taskRepository.delete).toHaveBeenCalledWith({ id: 1, userId: mockUser.id });

    });

    it('throws an error as task it not found', async () => {
      taskRepository.delete.mockResolvedValue({ affected: 0, message: 'Task not found' });

      expect(taskService.deleteTaskByID(1, mockUser as User)).rejects.toThrow(NotFoundException);

    });
  });

  describe('updateStatusTask', () => {
    it('call taskservice.getTaskByID() and successfully update status task by ID', async () => {

      taskService.getTaskByID = jest.fn().mockReturnValue({
        status: TaskStatus.OPEN,
        id: 123,
        save: jest.fn().mockReturnValue(true),
      });

      expect(taskService.getTaskByID).not.toHaveBeenCalled();

      const task = await taskService.updateStatusTask(123, TaskStatus.IN_PROGRESS, mockUser as User);

      expect(taskService.getTaskByID).toHaveBeenCalled();
      expect(task.save).toHaveBeenCalled();
      expect(task.status).toEqual(TaskStatus.IN_PROGRESS);

    });

  });

});
