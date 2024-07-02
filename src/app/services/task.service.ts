import { Injectable, inject, signal } from "@angular/core";
import { Task, TaskStatus } from "../tasks/task.model";
import { LoggingService } from "./logging.service";

@Injectable({
    providedIn: 'root'
})
export class TaskService {
    private tasks = signal<Task[]>([]);
    private _loggingService = inject(LoggingService);

    addTask(taskData: { title: string, description: string }): void {
        const newTask: Task = { id: Math.random().toString(), status: 'OPEN', ...taskData };
        this.tasks.update((oldTasks) => [...oldTasks, newTask]);
        this._loggingService.log("ADDED TASK WITH TITLE " + newTask.title);
    }

    getfilterTasks(selectedFilter: string) {
        console.log(selectedFilter);
        
        
        if (selectedFilter !== 'all')
            return this.tasks().filter(t => t.status === selectedFilter?.toUpperCase());
        else
            return this.tasks();
    }

    updateTaskStatus(id: string, status: TaskStatus) {
        this.tasks.update((oldTasks) => oldTasks.map(
            (task) => task.id === id ? { ...task, status: status } : task));
        this._loggingService.log(`Task change status in ${status}`)
    }

}