import React from 'react';
import { DragDropContext } from '@hello-pangea/dnd';
import { useTasks } from '../hooks/useTasks';
import Column from './Column';
import { BOARD_COLUMNS } from '../constants';

const Board: React.FC = () => {
  const { columns, deleteTask, handleDragEnd } = useTasks();

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <main className="flex flex-col md:flex-row justify-center p-4 gap-4 container mx-auto">
        {BOARD_COLUMNS.map(colDef => (
          <Column
            key={colDef.id}
            column={columns[colDef.id]}
            onDeleteTask={deleteTask}
          />
        ))}
      </main>
    </DragDropContext>
  );
};

export default Board;