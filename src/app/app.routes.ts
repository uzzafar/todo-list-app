import { Routes } from '@angular/router';
import { AddTaskComponent } from './add-task/add-task.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TaskDetailsComponent } from './task-details/task-details.component';

export const routes: Routes = [
    { path: '', component: TodoListComponent },
    { path: 'add-task', component: AddTaskComponent },
    { path: 'todo-list', component: TodoListComponent },
    { path: 'tasks/:id', component: TaskDetailsComponent }
];
