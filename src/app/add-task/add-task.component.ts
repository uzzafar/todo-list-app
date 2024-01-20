import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.sass'
})
export class AddTaskComponent  {
  taskForm: FormGroup;
  minDate: string;
  groups: string[] = ['Group 1', 'Group 2', 'Group 3'];

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private router: Router
  ) {
    this.taskForm = this.fb.group({
      id: [this.generateId(), Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required],
      priority: ['', Validators.required],
      deliveryDate: ['', [Validators.required]],
      group: ['', Validators.required],
      completed: false,
      state: 'Pending'
    });
    const currentDate = new Date();
    this.minDate = this.formatDate(currentDate);
  }

  private generateId(): number {
    return Math.floor(Math.random() * 10000);
  }


  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);

    return `${year}-${month}-${day}`;
  }

  ngOnInit(): void {
    this.groups = ['Group 1', 'Group 2', 'Group 3'];
  }

  addTask(): void {
    if (this.taskForm.valid) {
      const newTask = this.taskForm.value;
      this.taskService.addTask(newTask);
      this.clearForm();
      this.goBackToList();
    }
  }

  clearForm(): void {
    this.taskForm.reset();
  }

  goBackToList(): void {
    this.router.navigate(['/todo-list']);
  }

  futureDateValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const currentDate = new Date();
    const deliveryDate = new Date(control.value);

    if (deliveryDate <= currentDate) {
      return { 'invalidDate': true };
    }

    return null;
  }
}