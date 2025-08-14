import React from 'react';
import { Droppable } from '@hello-pangea/dnd';
import { Column as ColumnType } from '../types';
import TaskCard from './TaskCard';

interface ColumnProps {
  column: ColumnType;
  onDeleteTask: (taskId: string, columnId: ColumnType['id']) => void;
}

const Column: React.FC<ColumnProps> = ({ column, onDeleteTask }) => {
  return (
    <div className="w-full md:w-1/3 flex flex-col p-2">
      <div className="bg-gray-900 rounded-xl p-4 flex-grow">
        <h3 className="text-lg font-bold text-gray-200 mb-4 px-2 tracking-wider uppercase">{column.title}</h3>
        <Droppable droppableId={column.id}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={`min-h-[200px] p-2 rounded-lg transition-colors duration-300 ${snapshot.isDraggingOver ? 'bg-gray-700/50' : 'bg-transparent'}`}
            >
              {column.tasks.map((task, index) => (
                <TaskCard key={task.id} task={task} index={index} columnId={column.id} onDelete={onDeleteTask} />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </div>
  );
};

export default Column;