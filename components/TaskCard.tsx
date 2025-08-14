import React from 'react';
import { Draggable } from '@hello-pangea/dnd';
import { Task, ColumnId } from '../types';
import TrashIcon from './icons/TrashIcon';

interface TaskCardProps {
  task: Task;
  index: number;
  columnId: ColumnId;
  onDelete: (taskId: string, columnId: ColumnId) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, index, columnId, onDelete }) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`bg-gray-800 rounded-lg p-4 mb-3 shadow-md hover:bg-gray-700 transition-colors duration-200 ease-in-out ${snapshot.isDragging ? 'ring-2 ring-blue-500 shadow-lg' : ''}`}
        >
          <div className="flex justify-between items-start">
            <div>
              <h4 className="text-md font-bold text-gray-100">{task.title}</h4>
              {task.description && <p className="text-sm text-gray-400 mt-1">{task.description}</p>}
            </div>
            <button
              onClick={() => onDelete(task.id, columnId)}
              className="text-gray-500 hover:text-red-500 transition-colors p-1 rounded-full"
              aria-label="Delete task"
            >
              <TrashIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;