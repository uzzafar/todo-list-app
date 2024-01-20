import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.sass'
})
export class SideMenuComponent {
  @Output() navigateEvent = new EventEmitter<string>();
  @Output() filterByGroupEvent = new EventEmitter<string>();
  @Output() toggleMenuEvent = new EventEmitter<void>();

  groups: string[] = ['Group 1', 'Group 2', 'Group 3'];
  showGroupMenu = false;
  isExpanded = true;

  navigate(route: string): void {
    this.navigateEvent.emit(route);
  }

  toggleGroupMenu(): void {
    this.showGroupMenu = !this.showGroupMenu;
  }

  filterByGroup(group: string): void {
    this.filterByGroupEvent.emit(group);
    this.showGroupMenu = false;
  }

  toggleMenu(): void {
    this.isExpanded = !this.isExpanded;
    this.toggleMenuEvent.emit();
  }
}