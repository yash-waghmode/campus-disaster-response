import React, { useState } from 'react';

const INITIAL_AUDIT_TASKS = [
  { id: 1, category: 'Fire Safety', task: 'Inspect all campus fire extinguishers and pressure gauges', completed: false },
  { id: 2, category: 'Fire Safety', task: 'Test primary and backup fire alarm systems', completed: false },
  { id: 3, category: 'Evacuation', task: 'Inspect emergency exit routes, stairwells, and push-bars for blockages', completed: false },
  { id: 4, category: 'Evacuation', task: 'Verify backup battery power on illuminated exit signs', completed: false },
  { id: 5, category: 'Medical', task: 'Audit and restock all floor-level first aid kits and trauma kits', completed: false },
  { id: 6, category: 'Communication', task: 'Perform functional test on BitChat offline mesh communication nodes', completed: false },
  { id: 7, category: 'Communication', task: 'Verify campus Public Address (PA) speaker system clarity', completed: false }
];

export default function SafetyChecklist() {
  const [tasks, setTasks] = useState(INITIAL_AUDIT_TASKS);

  const toggleTask = (id) => {
    setTasks(prevTasks =>
      prevTasks.map(t => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const completedCount = tasks.filter(t => t.completed).length;
  const progressPercent = Math.round((completedCount / tasks.length) * 100);

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-xl shadow-md border border-gray-200">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Institutional Safety Audit Checklist</h2>
          <p className="text-sm text-gray-500">Track pre-disaster campus preparedness and audit verification</p>
        </div>
        <div className="text-right">
          <span className="text-2xl font-extrabold text-blue-600">{progressPercent}%</span>
          <p className="text-xs text-gray-500">{completedCount} of {tasks.length} Completed</p>
        </div>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
        <div
          className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="space-y-3">
        {tasks.map(task => (
          <div
            key={task.id}
            onClick={() => toggleTask(task.id)}
            className={`flex items-center justify-between p-4 rounded-lg border cursor-pointer transition ${
              task.completed ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
            }`}
          >
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => {}}
                className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
              />
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 block">
                  {task.category}
                </span>
                <span className={`text-sm ${task.completed ? 'line-through text-gray-500' : 'text-gray-800 font-medium'}`}>
                  {task.task}
                </span>
              </div>
            </div>
            <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
              task.completed ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
            }`}>
              {task.completed ? 'Verified' : 'Pending'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
