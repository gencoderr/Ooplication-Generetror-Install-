import React, { useState } from 'react';
import { DragDropContext } from '@hello-pangea/dnd';
import Header from './components/Header';
import Column from './components/Column';
import { BOARD_COLUMNS } from './constants';
import AddTaskModal from './components/AddTaskModal';
import GenerateTasksModal from './components/GenerateTasksModal';
import { useTasks } from './hooks/useTasks';
import { usePWAInstall } from './hooks/usePWAInstall';
import { ColumnId } from './types';

const App: React.FC = () => {
  const [isAddTaskModalOpen, setAddTaskModalOpen] = useState(false);
  const [isGenerateTasksModalOpen, setGenerateTasksModalOpen] = useState(false);
  
  const { columns, addTask, addMultipleTasks, deleteTask, handleDragEnd } = useTasks();
  const { canInstall, promptInstall } = usePWAInstall();

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      <Header
        onOpenAddTaskModal={() => setAddTaskModalOpen(true)}
        onOpenGenerateTasksModal={() => setGenerateTasksModalOpen(true)}
        canInstall={canInstall}
        onInstall={promptInstall}
      />
      
      <DragDropContext onDragEnd={handleDragEnd}>
        <main className="flex flex-col md:flex-row justify-center p-4 gap-4 container mx-auto">
          {BOARD_COLUMNS.map(colDef => (
            <Column
              key={colDef.id}
              column={columns[colDef.id] ?? { id: colDef.id, title: colDef.title, tasks: [] }}
              onDeleteTask={deleteTask}
            />
          ))}
        </main>
      </DragDropContext>
      
      <AddTaskModal
        isOpen={isAddTaskModalOpen}
        onClose={() => setAddTaskModalOpen(false)}
        onAddTask={addTask}
      />
      
      <GenerateTasksModal
        isOpen={isGenerateTasksModalOpen}
        onClose={() => setGenerateTasksModalOpen(false)}
        onAddTasks={(tasks) => addMultipleTasks(tasks, ColumnId.ToDo)}
      />
    </div>
  );
};

export default App;