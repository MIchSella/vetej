import { Task, TaskStatus, CreateTaskInput, TaskFilter, TaskStats } from './types.js';
import { Storage } from './storage.js';

/**
 * TaskManager class handles all task operations
 */
export class TaskManager {
  private tasks: Task[] = [];
  private storage: Storage;
  private nextId: number = 1;

  constructor(storage?: Storage) {
    this.storage = storage || new Storage();
  }

  /**
   * Initialize the task manager by loading existing tasks
   */
  async initialize(): Promise<void> {
    this.tasks = await this.storage.load();
    this.nextId = this.tasks.length > 0
      ? Math.max(...this.tasks.map(t => t.id)) + 1
      : 1;
  }

  /**
   * Create a new task
   */
  async createTask(input: CreateTaskInput): Promise<Task> {
    const task: Task = {
      id: this.nextId++,
      title: input.title,
      description: input.description,
      status: TaskStatus.PENDING,
      createdAt: new Date(),
      priority: input.priority || 'medium',
      tags: input.tags || [],
    };

    this.tasks.push(task);
    await this.storage.save(this.tasks);
    return task;
  }

  /**
   * Get all tasks, optionally filtered
   */
  getTasks(filter?: TaskFilter): Task[] {
    let filtered = [...this.tasks];

    if (filter?.status) {
      filtered = filtered.filter(t => t.status === filter.status);
    }

    if (filter?.priority) {
      filtered = filtered.filter(t => t.priority === filter.priority);
    }

    if (filter?.tags && filter.tags.length > 0) {
      filtered = filtered.filter(t =>
        filter.tags!.some(tag => t.tags.includes(tag))
      );
    }

    return filtered;
  }

  /**
   * Get a task by ID
   */
  getTaskById(id: number): Task | undefined {
    return this.tasks.find(t => t.id === id);
  }

  /**
   * Complete a task
   */
  async completeTask(id: number): Promise<Task | undefined> {
    const task = this.getTaskById(id);
    if (!task) {
      return undefined;
    }

    if (task.status === TaskStatus.COMPLETED) {
      throw new Error('Task is already completed');
    }

    task.status = TaskStatus.COMPLETED;
    task.completedAt = new Date();
    await this.storage.save(this.tasks);
    return task;
  }

  /**
   * Delete a task
   */
  async deleteTask(id: number): Promise<boolean> {
    const index = this.tasks.findIndex(t => t.id === id);
    if (index === -1) {
      return false;
    }

    this.tasks.splice(index, 1);
    await this.storage.save(this.tasks);
    return true;
  }

  /**
   * Update a task
   */
  async updateTask(id: number, updates: Partial<Omit<Task, 'id' | 'createdAt'>>): Promise<Task | undefined> {
    const task = this.getTaskById(id);
    if (!task) {
      return undefined;
    }

    Object.assign(task, updates);
    await this.storage.save(this.tasks);
    return task;
  }

  /**
   * Get task statistics
   */
  getStats(): TaskStats {
    const stats: TaskStats = {
      total: this.tasks.length,
      pending: 0,
      completed: 0,
      byPriority: {
        low: 0,
        medium: 0,
        high: 0,
      },
    };

    for (const task of this.tasks) {
      if (task.status === TaskStatus.PENDING) {
        stats.pending++;
      } else {
        stats.completed++;
      }

      stats.byPriority[task.priority]++;
    }

    return stats;
  }

  /**
   * Clear all tasks
   */
  async clearAll(): Promise<void> {
    this.tasks = [];
    this.nextId = 1;
    await this.storage.clear();
  }
}
