import { Component } from '@angular/core';
import { Router,  RouterModule, RouterOutlet } from '@angular/router';

import { SideMenuComponent } from './side-menu/side-menu.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, RouterOutlet, SideMenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'
})
export class AppComponent {
  selectedFilter: string ='';
  constructor(private router: Router){

  }

  navigate(route: string): void {
    this.selectedFilter = route;
    switch (route) {
      case 'Home':
        this.router.navigate(['/']);
        break;
      case 'ALL':
        this.router.navigate(['/todo-list']);
        break;
      case 'Today':
        this.router.navigate(['/todo-list'], { queryParams: { date: 'today' } });
        break;
      case 'Week':
        this.router.navigate(['/todo-list'], { queryParams: { date: 'week' } });
        break;
      case 'Done':
        this.router.navigate(['/todo-list'], { queryParams: { status: 'done' } });
        break;
      case 'Deleted':
        this.router.navigate(['/todo-list'], { queryParams: { status: 'deleted' } });
        break;
      default:
        break;
    }
  }

  filterByGroup(group: string): void {
    console.log('Filter by group:', group);
    this.router.navigate(['/todo-list'], { queryParams: { group } });
  }
}