export interface Task {
    name: string;
    status: TaskStatus;
}

export enum TaskStatus {
    ToDo = "To Do",
    Done = "Done"
}
