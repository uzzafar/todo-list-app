import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../task.service';
import { Task } from '../task.model';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [RouterModule, FormsModule, NgSelectModule, DatePipe],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.sass'
})
export class TodoListComponent implements OnInit {
  taskGroups: { name: string, tasks: Task[] }[] = [];
  filteredTaskGroups: { name: string, tasks: Task[] }[] = [];
  filterTitle!: string;
  filterDate!: string;
  filterStatus!: string;
  filterGroups: string[] = [];
  groups: string[] = [];
  selectedTasks: Task[] = [];

  constructor(private taskService: TaskService, private router: Router, private route: ActivatedRoute) {
    this.route.queryParams.subscribe((params) => {
      this.filterGroups = params['group'];
      this.filterStatus= params['status'];
      
      if(params['date']) {
        if(params['date'] === 'today') {
          this.filterDate= new Date().toDateString();
        }
      }
      this.filterTasks();
    });
  }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskGroups = this.taskService.getGroupedTasks();
    this.groups = this.taskService.getDistinctGroups();
    this.filterTasks();
  }

  filterTasks(): void {
    this.filteredTaskGroups = this.taskService.filterTasks(this.filterStatus, this.filterTitle, this.filterDate, this.filterGroups);
  }

  updateSelectedTasks(): void {
    this.selectedTasks = this.taskGroups
      .flatMap(group => group.tasks)
      .filter(task => task.selected);
  }

  anyTaskSelected(): boolean {
    return this.selectedTasks.length > 0;
  }

  deleteSelected(): void {
    this.selectedTasks.forEach(task => this.taskService.deleteTask(task.id));
    this.loadTasks();
    this.selectedTasks = [];
  }

  markSelectedDone(): void {
    this.selectedTasks.forEach(task => this.taskService.markTaskDone(task.id));
    this.loadTasks();
    this.selectedTasks = [];
  }

  deleteTask(task: Task): void {
    this.taskService.deleteTask(task.id);
    this.loadTasks();
  }

  markDone(task: Task): void {
    this.taskService.markTaskDone(task.id);
    this.loadTasks();
  }

  createNewTask(): void {
    this.router.navigate(['/add-task']);
  }

  navigate(task: any) {
    this.router.navigate(['/tasks',task.id]);
  }

}
