
export interface Task {
  id: string;
  title: string;
  description?: string;
}

export enum ColumnId {
  ToDo = 'TODO',
  InProgress = 'IN_PROGRESS',
  Done = 'DONE',
}

export interface Column {
  id: ColumnId;
  title: string;
  tasks: Task[];
}
