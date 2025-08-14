
import { Column, ColumnId } from './types';

export const BOARD_COLUMNS: Column[] = [
  { id: ColumnId.ToDo, title: 'To Do', tasks: [] },
  { id: ColumnId.InProgress, title: 'In Progress', tasks: [] },
  { id: ColumnId.Done, title: 'Done', tasks: [] },
];
