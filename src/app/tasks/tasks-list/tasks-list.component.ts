import { Component, OnChanges, OnInit, SimpleChanges, computed, inject, signal } from '@angular/core';

import { TaskItemComponent } from './task-item/task-item.component';
import { TaskService } from '../../services/task.service';
import { TASK_STATUS_OPTIONS, TaskStatusOptionsProvider } from '../task.model';

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.css',
  imports: [TaskItemComponent],
  providers: [TaskStatusOptionsProvider]
})
export class TasksListComponent {
  selectedFilter = signal<string>('all');
  taskStatusOptions = inject(TASK_STATUS_OPTIONS);
  private _taskService = inject(TaskService);
  

  tasks = computed(() => {
    let statusValue = 'OPEN';

    switch (this.selectedFilter()) {
      case 'open':
        statusValue = 'OPEN';
        break;
      case 'in-progress':
        statusValue = 'IN_PROGRESS';
        break;
      case 'done':
        statusValue = 'DONE';
        break;
      default:
        break;
    }
    return this._taskService.getfilterTasks(statusValue)
  } );

  onChangeTasksFilter(filter: string) {
    this.selectedFilter.set(filter);
  }
}
