import { Injectable } from '@angular/core';
import { Task } from './task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private readonly localStorageKey = 'todo_tasks';

  getTasks(): Task[] {
    const tasksJson = localStorage.getItem(this.localStorageKey);
    return tasksJson ? JSON.parse(tasksJson) : [];
  }

  addTask(task: Task): void {
    const tasks = this.getTasks();
    tasks.push(task);
    localStorage.setItem(this.localStorageKey, JSON.stringify(tasks));
  }

  clearTasks(): void {
    localStorage.removeItem(this.localStorageKey);
  }

  getDistinctGroups(): string[] {
    const tasks = this.getTasks();
    const groups = new Set<string>();

    tasks.forEach(task => {
        groups.add(task.group);
    });

    return Array.from(groups);
  }

  getGroupedTasks(): { name: string, tasks: Task[] }[] {
    const tasks = this.getTasks();
    const groupedTasks: { name: string, tasks: Task[] }[] = [];

    tasks.forEach(task => {
      if (task.state !== 'Deleted') {
        const groupIndex = groupedTasks.findIndex(group => group.name === task.group);

        if (groupIndex !== -1) {
          groupedTasks[groupIndex].tasks.push(task);
        } else {
          groupedTasks.push({ name: task.group, tasks: [task] });
        }
      }
    });

    return groupedTasks;
  }

  deleteTask(taskId: number): void {
    const tasks = this.getTasks();
    const taskIndex = tasks.findIndex(task => task.id === taskId);

    if (taskIndex !== -1) {
      tasks[taskIndex].state = 'Deleted';
      localStorage.setItem(this.localStorageKey, JSON.stringify(tasks));
    }
  }

  getTaskById(taskId: number): Task {
    const tasks = this.getTasks();
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    return tasks[taskIndex];
  }

  markTaskDone(taskId: number): void {
    const tasks = this.getTasks();
    const taskIndex = tasks.findIndex(task => task.id === taskId);

    if (taskIndex !== -1) {
      tasks[taskIndex].state = 'Done';
      localStorage.setItem(this.localStorageKey, JSON.stringify(tasks));
    }
  }

  filterTasks(status:string, title: string, date: string, groups: string[]): { name: string, tasks: Task[] }[] {
    const tasks = this.getTasks();
    let filteredTasks = tasks;
    console.log(filteredTasks);
    console.log(date);
    if (status) {
      filteredTasks = filteredTasks.filter(task => task.state.toLowerCase().includes(status.toLowerCase()));
    }
    
    if (title) {
      filteredTasks = filteredTasks.filter(task => task.title.toLowerCase().includes(title.toLowerCase()));
    }

    if (date) {
      filteredTasks = filteredTasks.filter(task => new Date(task.deliveryDate).toDateString() === new Date(date).toDateString());
    }

    if (groups && groups.length > 0) {
      filteredTasks = filteredTasks.filter(task => groups.includes(task.group));
    }

    const distinctGroups = this.getDistinctGroups();

    return distinctGroups.map(group => {
      return {
        name: group,
        tasks: filteredTasks.filter(task => task.group === group)
      };
    });
  }
}