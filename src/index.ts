#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import { TaskManager } from './task-manager.js';
import { TaskStatus, Task } from './types.js';

const program = new Command();

// Initialize task manager
const taskManager = new TaskManager();
await taskManager.initialize();

/**
 * Format a task for display
 */
function formatTask(task: Task): string {
  const statusIcon = task.status === TaskStatus.COMPLETED ? '✓' : '○';
  const statusColor = task.status === TaskStatus.COMPLETED ? chalk.green : chalk.yellow;
  const priorityColor =
    task.priority === 'high' ? chalk.red :
    task.priority === 'medium' ? chalk.yellow :
    chalk.blue;

  const id = chalk.gray(`[${task.id}]`);
  const status = statusColor(statusIcon);
  const priority = priorityColor(`[${task.priority.toUpperCase()}]`);
  const title = task.status === TaskStatus.COMPLETED ? chalk.strikethrough(task.title) : task.title;
  const tags = task.tags.length > 0 ? chalk.cyan(` #${task.tags.join(' #')}`) : '';

  let output = `${id} ${status} ${priority} ${title}${tags}`;

  if (task.description) {
    output += `\n    ${chalk.gray(task.description)}`;
  }

  if (task.completedAt) {
    output += `\n    ${chalk.gray(`Completed: ${task.completedAt.toLocaleDateString()}`)}`;
  }

  return output;
}

// Configure CLI
program
  .name('vetej')
  .description('A simple but powerful task management CLI')
  .version('1.0.0');

// Add command
program
  .command('add <title>')
  .description('Add a new task')
  .option('-d, --description <description>', 'Task description')
  .option('-p, --priority <priority>', 'Task priority (low, medium, high)', 'medium')
  .option('-t, --tags <tags>', 'Comma-separated tags')
  .action(async (title, options) => {
    try {
      const task = await taskManager.createTask({
        title,
        description: options.description,
        priority: options.priority,
        tags: options.tags ? options.tags.split(',').map((t: string) => t.trim()) : [],
      });
      console.log(chalk.green('✓ Task added successfully!'));
      console.log(formatTask(task));
    } catch (error) {
      console.error(chalk.red('Error adding task:'), error);
      process.exit(1);
    }
  });

// List command
program
  .command('list')
  .description('List all tasks')
  .option('-p, --pending', 'Show only pending tasks')
  .option('-c, --completed', 'Show only completed tasks')
  .option('--priority <priority>', 'Filter by priority')
  .option('-t, --tags <tags>', 'Filter by tags (comma-separated)')
  .action((options) => {
    let tasks = taskManager.getTasks({
      status: options.pending ? TaskStatus.PENDING : options.completed ? TaskStatus.COMPLETED : undefined,
      priority: options.priority,
      tags: options.tags ? options.tags.split(',').map((t: string) => t.trim()) : undefined,
    });

    if (tasks.length === 0) {
      console.log(chalk.yellow('No tasks found.'));
      return;
    }

    console.log(chalk.bold(`\nFound ${tasks.length} task(s):\n`));
    tasks.forEach(task => {
      console.log(formatTask(task));
      console.log('');
    });
  });

// Complete command
program
  .command('complete <id>')
  .description('Mark a task as completed')
  .action(async (id) => {
    try {
      const task = await taskManager.completeTask(parseInt(id));
      if (!task) {
        console.log(chalk.red(`Task #${id} not found.`));
        process.exit(1);
      }
      console.log(chalk.green('✓ Task completed!'));
      console.log(formatTask(task));
    } catch (error) {
      if (error instanceof Error) {
        console.error(chalk.red(error.message));
      } else {
        console.error(chalk.red('Error completing task'));
      }
      process.exit(1);
    }
  });

// Delete command
program
  .command('delete <id>')
  .description('Delete a task')
  .action(async (id) => {
    const success = await taskManager.deleteTask(parseInt(id));
    if (success) {
      console.log(chalk.green(`✓ Task #${id} deleted.`));
    } else {
      console.log(chalk.red(`Task #${id} not found.`));
      process.exit(1);
    }
  });

// Stats command
program
  .command('stats')
  .description('Show task statistics')
  .action(() => {
    const stats = taskManager.getStats();

    console.log(chalk.bold('\n📊 Task Statistics\n'));
    console.log(`Total tasks: ${chalk.cyan(stats.total)}`);
    console.log(`Pending: ${chalk.yellow(stats.pending)}`);
    console.log(`Completed: ${chalk.green(stats.completed)}`);
    console.log('');
    console.log(chalk.bold('By Priority:'));
    console.log(`  High: ${chalk.red(stats.byPriority.high)}`);
    console.log(`  Medium: ${chalk.yellow(stats.byPriority.medium)}`);
    console.log(`  Low: ${chalk.blue(stats.byPriority.low)}`);
    console.log('');

    if (stats.total > 0) {
      const completionRate = ((stats.completed / stats.total) * 100).toFixed(1);
      console.log(`Completion rate: ${chalk.cyan(completionRate + '%')}`);
    }
  });

// Parse arguments
program.parse();
