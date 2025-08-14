import { useState, useEffect } from 'react';
import { Task, Column, ColumnId } from '../types';
import { BOARD_COLUMNS } from '../constants';
import { DropResult } from '@hello-pangea/dnd';

const LOCAL_STORAGE_KEY = 'zenith-task-board';

export const useTasks = () => {
  const [columns, setColumns] = useState<Record<ColumnId, Column>>(() => {
    try {
      const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (savedData) {
        return JSON.parse(savedData);
      }
    } catch (error) {
      console.error("Could not parse tasks from localStorage", error);
    }
    const initialColumns = BOARD_COLUMNS.reduce((acc, col) => {
      acc[col.id] = col;
      return acc;
    }, {} as Record<ColumnId, Column>);
    return initialColumns;
  });

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(columns));
    } catch (error) {
      console.error("Could not save tasks to localStorage", error);
    }
  }, [columns]);

  const addTask = (task: Omit<Task, 'id'>, columnId: ColumnId = ColumnId.ToDo) => {
    const newTask: Task = { ...task, id: `task-${Date.now()}` };
    setColumns(prev => {
      const targetColumn = prev[columnId];
      return {
        ...prev,
        [columnId]: {
          ...targetColumn,
          tasks: [newTask, ...targetColumn.tasks],
        },
      };
    });
  };

  const addMultipleTasks = (tasks: Omit<Task, 'id'>[], columnId: ColumnId = ColumnId.ToDo) => {
    const newTasks: Task[] = tasks.map((task, index) => ({
        ...task,
        id: `task-${Date.now()}-${index}`
    }));

    setColumns(prev => {
      const targetColumn = prev[columnId];
      return {
        ...prev,
        [columnId]: {
          ...targetColumn,
          tasks: [...newTasks, ...targetColumn.tasks],
        },
      };
    });
  };

  const deleteTask = (taskId: string, columnId: ColumnId) => {
    setColumns(prev => {
      const targetColumn = prev[columnId];
      return {
        ...prev,
        [columnId]: {
          ...targetColumn,
          tasks: targetColumn.tasks.filter(t => t.id !== taskId),
        },
      };
    });
  };

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    const startColumn = columns[source.droppableId as ColumnId];
    const endColumn = columns[destination.droppableId as ColumnId];
    const task = startColumn.tasks.find(t => t.id === draggableId);

    if (!task) return;

    if (startColumn === endColumn) {
      const newTasks = Array.from(startColumn.tasks);
      newTasks.splice(source.index, 1);
      newTasks.splice(destination.index, 0, task);

      setColumns(prev => ({
        ...prev,
        [startColumn.id]: {
          ...startColumn,
          tasks: newTasks,
        },
      }));
    } else {
      const startTasks = Array.from(startColumn.tasks);
      startTasks.splice(source.index, 1);
      const endTasks = Array.from(endColumn.tasks);
      endTasks.splice(destination.index, 0, task);
      
      setColumns(prev => ({
        ...prev,
        [startColumn.id]: {
          ...startColumn,
          tasks: startTasks,
        },
        [endColumn.id]: {
          ...endColumn,
          tasks: endTasks,
        },
      }));
    }
  };

  return { columns, addTask, addMultipleTasks, deleteTask, handleDragEnd, setColumns };
};