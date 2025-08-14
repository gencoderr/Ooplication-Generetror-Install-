
import React, { useState } from 'react';
import { generateTasksFromGoal } from '../services/geminiService';
import SparklesIcon from './icons/SparklesIcon';

interface GenerateTasksModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTasks: (tasks: { title: string; description: string }[]) => void;
}

const GenerateTasksModal: React.FC<GenerateTasksModalProps> = ({ isOpen, onClose, onAddTasks }) => {
  const [goal, setGoal] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [generatedTasks, setGeneratedTasks] = useState<{ title: string; description: string; checked: boolean }[]>([]);

  if (!isOpen) return null;

  const handleGenerate = async () => {
    if (!goal.trim()) {
      setError('Please enter a goal.');
      return;
    }
    setIsLoading(true);
    setError('');
    setGeneratedTasks([]);
    try {
      const tasks = await generateTasksFromGoal(goal);
      setGeneratedTasks(tasks.map(t => ({...t, checked: true})));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddTask = () => {
    const tasksToAdd = generatedTasks.filter(t => t.checked).map(({ title, description }) => ({ title, description }));
    if (tasksToAdd.length > 0) {
      onAddTasks(tasksToAdd);
    }
    onClose();
    // Reset state for next time
    setGoal('');
    setGeneratedTasks([]);
  };

  const handleCheckboxChange = (index: number) => {
    setGeneratedTasks(prev => {
        const newTasks = [...prev];
        newTasks[index].checked = !newTasks[index].checked;
        return newTasks;
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-xl shadow-2xl p-8 w-full max-w-2xl text-white transform transition-all duration-300 scale-100">
        <h2 className="text-2xl font-bold mb-4 flex items-center"><SparklesIcon className="w-6 h-6 mr-3 text-blue-400"/>Generate Tasks with AI</h2>
        <p className="text-gray-400 mb-6">Describe a large goal, and let AI break it down into smaller tasks for you.</p>
        
        <div className="relative">
          <textarea
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            placeholder="e.g., Plan a team offsite for Q3"
            className="w-full bg-gray-900 border-2 border-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            rows={3}
          />
          <button
            onClick={handleGenerate}
            disabled={isLoading}
            className="absolute bottom-3 right-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded-lg flex items-center transition-colors"
          >
            {isLoading ? 'Generating...' : 'Generate'}
          </button>
        </div>

        {error && <p className="text-red-400 mt-4">{error}</p>}
        
        {isLoading && <div className="text-center p-8">Loading suggestions...</div>}

        {generatedTasks.length > 0 && (
          <div className="mt-6 max-h-64 overflow-y-auto pr-2">
            <h3 className="text-lg font-semibold mb-2">Suggested Tasks:</h3>
            <ul className="space-y-2">
                {generatedTasks.map((task, index) => (
                    <li key={index} className="bg-gray-700 p-3 rounded-lg flex items-center">
                        <input type="checkbox" checked={task.checked} onChange={() => handleCheckboxChange(index)} className="mr-4 h-5 w-5 rounded bg-gray-900 border-gray-600 text-blue-500 focus:ring-blue-600" />
                        <div className="flex-1">
                            <p className="font-semibold">{task.title}</p>
                            <p className="text-sm text-gray-400">{task.description}</p>
                        </div>
                    </li>
                ))}
            </ul>
          </div>
        )}

        <div className="flex justify-end gap-4 mt-8">
          <button onClick={onClose} className="py-2 px-4 text-gray-300 hover:bg-gray-700 rounded-lg transition-colors">Cancel</button>
          <button onClick={handleAddTask} disabled={generatedTasks.filter(t => t.checked).length === 0} className="bg-green-600 hover:bg-green-700 disabled:bg-green-800 disabled:cursor-not-allowed text-white font-bold py-2 px-6 rounded-lg transition-colors">Add Selected Tasks</button>
        </div>
      </div>
    </div>
  );
};

export default GenerateTasksModal;
