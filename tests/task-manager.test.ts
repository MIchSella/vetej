import { describe, it, expect, beforeEach } from 'vitest';
import { TaskManager } from '../src/task-manager.js';
import { Storage } from '../src/storage.js';
import { TaskStatus } from '../src/types.js';

// Mock storage for testing
class MockStorage extends Storage {
  private data: any[] = [];

  async load() {
    return this.data;
  }

  async save(tasks: any[]) {
    this.data = tasks;
  }

  async clear() {
    this.data = [];
  }
}

describe('TaskManager', () => {
  let taskManager: TaskManager;

  beforeEach(async () => {
    taskManager = new TaskManager(new MockStorage());
    await taskManager.initialize();
  });

  describe('createTask', () => {
    it('should create a task with default values', async () => {
      const task = await taskManager.createTask({
        title: 'Test task',
      });

      expect(task.title).toBe('Test task');
      expect(task.status).toBe(TaskStatus.PENDING);
      expect(task.priority).toBe('medium');
      expect(task.tags).toEqual([]);
      expect(task.id).toBe(1);
    });

    it('should create a task with custom priority and tags', async () => {
      const task = await taskManager.createTask({
        title: 'Important task',
        priority: 'high',
        tags: ['urgent', 'work'],
      });

      expect(task.priority).toBe('high');
      expect(task.tags).toEqual(['urgent', 'work']);
    });

    it('should increment task IDs', async () => {
      const task1 = await taskManager.createTask({ title: 'Task 1' });
      const task2 = await taskManager.createTask({ title: 'Task 2' });

      expect(task1.id).toBe(1);
      expect(task2.id).toBe(2);
    });
  });

  describe('getTasks', () => {
    beforeEach(async () => {
      await taskManager.createTask({ title: 'Task 1', priority: 'high' });
      await taskManager.createTask({ title: 'Task 2', priority: 'low' });
      await taskManager.createTask({ title: 'Task 3', priority: 'high', tags: ['work'] });
    });

    it('should return all tasks when no filter is provided', () => {
      const tasks = taskManager.getTasks();
      expect(tasks).toHaveLength(3);
    });

    it('should filter by priority', () => {
      const tasks = taskManager.getTasks({ priority: 'high' });
      expect(tasks).toHaveLength(2);
      expect(tasks.every(t => t.priority === 'high')).toBe(true);
    });

    it('should filter by tags', () => {
      const tasks = taskManager.getTasks({ tags: ['work'] });
      expect(tasks).toHaveLength(1);
      expect(tasks[0].title).toBe('Task 3');
    });

    it('should filter by status', async () => {
      await taskManager.completeTask(1);
      const pending = taskManager.getTasks({ status: TaskStatus.PENDING });
      const completed = taskManager.getTasks({ status: TaskStatus.COMPLETED });

      expect(pending).toHaveLength(2);
      expect(completed).toHaveLength(1);
    });
  });

  describe('completeTask', () => {
    it('should mark a task as completed', async () => {
      const task = await taskManager.createTask({ title: 'Test task' });
      const completed = await taskManager.completeTask(task.id);

      expect(completed?.status).toBe(TaskStatus.COMPLETED);
      expect(completed?.completedAt).toBeInstanceOf(Date);
    });

    it('should return undefined for non-existent task', async () => {
      const result = await taskManager.completeTask(999);
      expect(result).toBeUndefined();
    });

    it('should throw error when completing already completed task', async () => {
      const task = await taskManager.createTask({ title: 'Test task' });
      await taskManager.completeTask(task.id);

      await expect(taskManager.completeTask(task.id)).rejects.toThrow(
        'Task is already completed'
      );
    });
  });

  describe('deleteTask', () => {
    it('should delete an existing task', async () => {
      const task = await taskManager.createTask({ title: 'Test task' });
      const result = await taskManager.deleteTask(task.id);

      expect(result).toBe(true);
      expect(taskManager.getTasks()).toHaveLength(0);
    });

    it('should return false for non-existent task', async () => {
      const result = await taskManager.deleteTask(999);
      expect(result).toBe(false);
    });
  });

  describe('getStats', () => {
    beforeEach(async () => {
      await taskManager.createTask({ title: 'Task 1', priority: 'high' });
      await taskManager.createTask({ title: 'Task 2', priority: 'low' });
      await taskManager.createTask({ title: 'Task 3', priority: 'high' });
      await taskManager.completeTask(1);
    });

    it('should return correct statistics', () => {
      const stats = taskManager.getStats();

      expect(stats.total).toBe(3);
      expect(stats.pending).toBe(2);
      expect(stats.completed).toBe(1);
      expect(stats.byPriority.high).toBe(2);
      expect(stats.byPriority.low).toBe(1);
      expect(stats.byPriority.medium).toBe(0);
    });
  });

  describe('updateTask', () => {
    it('should update task properties', async () => {
      const task = await taskManager.createTask({ title: 'Original title' });
      const updated = await taskManager.updateTask(task.id, {
        title: 'Updated title',
        priority: 'high',
      });

      expect(updated?.title).toBe('Updated title');
      expect(updated?.priority).toBe('high');
    });

    it('should return undefined for non-existent task', async () => {
      const result = await taskManager.updateTask(999, { title: 'New title' });
      expect(result).toBeUndefined();
    });
  });

  describe('clearAll', () => {
    it('should remove all tasks', async () => {
      await taskManager.createTask({ title: 'Task 1' });
      await taskManager.createTask({ title: 'Task 2' });

      await taskManager.clearAll();

      expect(taskManager.getTasks()).toHaveLength(0);
    });
  });
});
