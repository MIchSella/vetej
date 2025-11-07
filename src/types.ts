/**
 * Task status enumeration
 */
export enum TaskStatus {
  PENDING = 'pending',
  COMPLETED = 'completed'
}

/**
 * Task interface representing a single task
 */
export interface Task {
  id: number;
  title: string;
  description?: string;
  status: TaskStatus;
  createdAt: Date;
  completedAt?: Date;
  priority: 'low' | 'medium' | 'high';
  tags: string[];
}

/**
 * Task creation input (without auto-generated fields)
 */
export interface CreateTaskInput {
  title: string;
  description?: string;
  priority?: 'low' | 'medium' | 'high';
  tags?: string[];
}

/**
 * Task filter options for querying tasks
 */
export interface TaskFilter {
  status?: TaskStatus;
  priority?: 'low' | 'medium' | 'high';
  tags?: string[];
}

/**
 * Task statistics
 */
export interface TaskStats {
  total: number;
  pending: number;
  completed: number;
  byPriority: {
    low: number;
    medium: number;
    high: number;
  };
}
