import React, { useState } from 'react';
import {
  Plus,
  Search,
  CheckCircle,
  Circle,
} from 'lucide-react';
import { Header } from '../components/Layout/Header';
import { Card } from '../components/UI/Card';
import { Button } from '../components/UI/Button';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Task, TaskCategory, TaskPriority } from '../types';

export function TasksScreen() {
  const [tasks, setTasks] = useLocalStorage<Task[]>('tasks', []);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<TaskCategory | 'all'>('all');
  const [selectedPriority, setSelectedPriority] = useState<TaskPriority | 'all'>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    category: 'work' as TaskCategory,
    priority: 'medium' as TaskPriority,
  });

  const categories: { value: TaskCategory | 'all'; label: string }[] = [
    { value: 'all', label: 'All Categories' },
    { value: 'work', label: 'Work' },
    { value: 'personal', label: 'Personal' },
    { value: 'health', label: 'Health' },
    { value: 'learning', label: 'Learning' },
    { value: 'other', label: 'Other' },
  ];

  const priorities: { value: TaskPriority | 'all'; label: string }[] = [
    { value: 'all', label: 'All Priorities' },
    { value: 'high', label: 'High' },
    { value: 'medium', label: 'Medium' },
    { value: 'low', label: 'Low' },
  ];

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || task.category === selectedCategory;
    const matchesPriority = selectedPriority === 'all' || task.priority === selectedPriority;
    return matchesSearch && matchesCategory && matchesPriority;
  });

  const pendingTasks = filteredTasks.filter(task => !task.completed);
  const completedTasks = filteredTasks.filter(task => task.completed);

  const toggleTask = (taskId: string) => {
    setTasks(tasks.map(task =>
      task.id === taskId
        ? {
          ...task,
          completed: !task.completed,
          completedAt: !task.completed ? new Date() : undefined
        }
        : task
    ));
  };

  const getPriorityColor = (priority: TaskPriority) => {
    switch (priority) {
      case 'high': return 'text-red-400 bg-red-400/10';
      case 'medium': return 'text-yellow-400 bg-yellow-400/10';
      case 'low': return 'text-green-400 bg-green-400/10';
    }
  };

  const handleAddTask = () => {
    if (!newTask.title.trim()) {
      alert('Task title is required');
      return;
    }

    const task: Task = {
      id: Date.now().toString(),
      title: newTask.title,
      description: newTask.description,
      category: newTask.category,
      priority: newTask.priority,
      completed: false,
      createdAt: new Date(),
    };

    setTasks([...tasks, task]);
    setShowAddModal(false);
    setNewTask({
      title: '',
      description: '',
      category: 'work',
      priority: 'medium',
    });
  };

  const TaskItem = ({ task }: { task: Task }) => (
    <Card className="flex items-center gap-3 p-3 hover:bg-white/5">
      <button
        onClick={() => toggleTask(task.id)}
        className="flex-shrink-0"
      >
        {task.completed ? (
          <CheckCircle size={20} className="text-green-400" />
        ) : (
          <Circle size={20} className="text-gray-400 hover:text-coral-500" />
        )}
      </button>

      <div className="flex-1 min-w-0">
        <h3 className={`font-medium ${task.completed ? 'text-gray-500 line-through' : 'text-white'}`}>
          {task.title}
        </h3>
        {task.description && (
          <p className="text-sm text-gray-400 mt-1">{task.description}</p>
        )}
        <div className="flex items-center gap-2 mt-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
            {task.priority}
          </span>
          <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-400/10 text-blue-400">
            {task.category}
          </span>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="min-h-screen dark-gradient pb-20">
      <Header
        title="Tasks"
        rightAction={
          <Button
            variant="primary"
            size="small"
            icon={Plus}
            onClick={() => setShowAddModal(true)}
          >
            Add Task
          </Button>
        }
      />

      <div className="px-4 py-6 max-w-md mx-auto">
        {/* Search */}
        <div className="relative mb-4">
          <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-coral-500/50"
          />
        </div>

        {/* Filters */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value as TaskCategory | 'all')}
            className="px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-coral-500/50"
          >
            {categories.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>

          <select
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value as TaskPriority | 'all')}
            className="px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-coral-500/50"
          >
            {priorities.map((priority) => (
              <option key={priority.value} value={priority.value}>
                {priority.label}
              </option>
            ))}
          </select>
        </div>

        {/* Task Stats */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <Card className="text-center">
            <div className="text-2xl font-bold text-coral-500">{pendingTasks.length}</div>
            <div className="text-sm text-gray-400">Pending</div>
          </Card>
          <Card className="text-center">
            <div className="text-2xl font-bold text-green-400">{completedTasks.length}</div>
            <div className="text-sm text-gray-400">Completed</div>
          </Card>
        </div>

        {/* Task List */}
        {filteredTasks.length === 0 ? (
          <Card className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 bg-white/10 rounded-full flex items-center justify-center">
              📝
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">No tasks yet</h3>
            <p className="text-gray-400 mb-4">
              Create your first task to get started with your productivity journey
            </p>
            <Button variant="primary" icon={Plus} onClick={() => setShowAddModal(true)}>
              Add Task
            </Button>
          </Card>
        ) : (
          <div className="space-y-3">
            {pendingTasks.map((task) => (
              <TaskItem key={task.id} task={task} />
            ))}

            {completedTasks.length > 0 && (
              <>
                <div className="flex items-center gap-3 my-6">
                  <div className="flex-1 h-px bg-white/20"></div>
                  <span className="text-sm text-gray-400">Completed</span>
                  <div className="flex-1 h-px bg-white/20"></div>
                </div>

                {completedTasks.map((task) => (
                  <TaskItem key={task.id} task={task} />
                ))}
              </>
            )}
          </div>
        )}
      </div>

      {/* Add Task Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center px-4">
          <div className="bg-dark-900 p-6 rounded-xl w-full max-w-md space-y-4">
            <h2 className="text-xl text-white font-semibold">Add New Task</h2>

            <input
              type="text"
              placeholder="Title"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none"
            />

            <textarea
              placeholder="Description (optional)"
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none"
            />

            <div className="flex gap-2">
              <select
                value={newTask.category}
                onChange={(e) => setNewTask({ ...newTask, category: e.target.value as TaskCategory })}
                className="flex-1 px-3 py-2 bg-green-500/20 border border-coral-300/30 rounded-lg text-white"
             >
                {categories.filter(c => c.value !== 'all').map(cat => (
                  <option key={cat.value} value={cat.value}>{cat.label}</option>
                ))}
              </select>

              <select
                value={newTask.priority}
                onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as TaskPriority })}
                className="flex-1 px-3 py-2 bg-green-500/20 border border-coral-300/30 rounded-lg text-white"
             >
                {priorities.filter(p => p.value !== 'all').map(pr => (
                  <option key={pr.value} value={pr.value}>{pr.label}</option>
                ))}
              </select>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="ghost" onClick={() => setShowAddModal(false)}>Cancel</Button>
              <Button variant="primary" onClick={handleAddTask}>Save</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
