
import React from 'react';
import PlusIcon from './icons/PlusIcon';
import SparklesIcon from './icons/SparklesIcon';
import DownloadIcon from './icons/DownloadIcon';

interface HeaderProps {
  onOpenAddTaskModal: () => void;
  onOpenGenerateTasksModal: () => void;
  canInstall: boolean;
  onInstall: () => void;
}

const Header: React.FC<HeaderProps> = ({ onOpenAddTaskModal, onOpenGenerateTasksModal, canInstall, onInstall }) => {
  return (
    <header className="p-4 md:p-6 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          Zenith Task Manager
        </h1>
        <div className="flex items-center gap-2 md:gap-4">
          {canInstall && (
            <button
              onClick={onInstall}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-3 md:px-4 rounded-lg flex items-center gap-2 transition-transform transform hover:scale-105"
              title="Install App"
            >
              <DownloadIcon className="w-5 h-5" />
              <span className="hidden md:inline">Install</span>
            </button>
          )}
          <button
            onClick={onOpenGenerateTasksModal}
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-3 md:px-4 rounded-lg flex items-center gap-2 transition-transform transform hover:scale-105"
          >
            <SparklesIcon className="w-5 h-5" />
            <span className="hidden md:inline">Generate</span>
          </button>
          <button
            onClick={onOpenAddTaskModal}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-3 md:px-4 rounded-lg flex items-center gap-2 transition-transform transform hover:scale-105"
          >
            <PlusIcon className="w-5 h-5" />
            <span className="hidden md:inline">Add Task</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
