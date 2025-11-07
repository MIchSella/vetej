import { Task } from './types.js';
import { readFile, writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import { join, dirname } from 'path';
import { homedir } from 'os';

/**
 * Storage class for persisting tasks to disk
 */
export class Storage {
  private filePath: string;

  constructor(customPath?: string) {
    if (customPath) {
      this.filePath = customPath;
    } else {
      const dataDir = join(homedir(), '.vetej');
      this.filePath = join(dataDir, 'tasks.json');
    }
  }

  /**
   * Ensures the storage directory exists
   */
  private async ensureDirectory(): Promise<void> {
    const dir = dirname(this.filePath);
    if (!existsSync(dir)) {
      await mkdir(dir, { recursive: true });
    }
  }

  /**
   * Load all tasks from storage
   */
  async load(): Promise<Task[]> {
    try {
      if (!existsSync(this.filePath)) {
        return [];
      }

      const data = await readFile(this.filePath, 'utf-8');
      const tasks = JSON.parse(data);

      // Convert date strings back to Date objects
      return tasks.map((task: any) => ({
        ...task,
        createdAt: new Date(task.createdAt),
        completedAt: task.completedAt ? new Date(task.completedAt) : undefined,
      }));
    } catch (error) {
      console.error('Error loading tasks:', error);
      return [];
    }
  }

  /**
   * Save all tasks to storage
   */
  async save(tasks: Task[]): Promise<void> {
    try {
      await this.ensureDirectory();
      const data = JSON.stringify(tasks, null, 2);
      await writeFile(this.filePath, data, 'utf-8');
    } catch (error) {
      console.error('Error saving tasks:', error);
      throw error;
    }
  }

  /**
   * Clear all tasks from storage
   */
  async clear(): Promise<void> {
    await this.save([]);
  }
}
