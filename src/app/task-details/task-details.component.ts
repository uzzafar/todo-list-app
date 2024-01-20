import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../task.service';
import { Task } from '../task.model';

@Component({
  selector: 'app-task-details',
  standalone: true,
  imports: [],
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.sass'
})
export class TaskDetailsComponent {
  taskId!: number;
  task!: Task ;

  constructor(private route: ActivatedRoute, private router: Router, private taskService: TaskService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.taskId = Number(params.get('id'));
      this.task = this.taskService.getTaskById(this.taskId);
    });
  }

  goBackToList() {
    this.router.navigate(['todo-list']);
  }
}
