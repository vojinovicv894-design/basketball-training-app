import { useAuthStore, useTrainingStore } from '../store';
import { useState } from 'react';
import { Goal } from '../types';

const Goals: React.FC = () => {
  const user = useAuthStore((state) => state.user);
  const goals = useTrainingStore((state) => state.goals);
  const addGoal = useTrainingStore((state) => state.addGoal);
  const completeGoal = useTrainingStore((state) => state.completeGoal);
  const deleteGoal = useTrainingStore((state) => state.deleteGoal);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    target: '',
    unit: '',
    deadline: '',
  });

  const handleCreateGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const newGoal: Goal = {
      id: Date.now().toString(),
      userId: user.id,
      title: formData.title,
      description: formData.description,
      skillTargeted: {
        id: Date.now().toString(),
        name: formData.title,
        category: 'shooting',
        description: formData.description,
      },
      targetValue: parseInt(formData.target),
      currentValue: 0,
      unit: formData.unit,
      deadline: new Date(formData.deadline),
      isCompleted: false,
      createdDate: new Date(),
    };

    addGoal(newGoal);
    setFormData({ title: '', description: '', target: '', unit: '', deadline: '' });
    setShowForm(false);
  };

  const userGoals = goals.filter((g) => g.userId === user?.id);
  const activeGoals = userGoals.filter((g) => !g.isCompleted);
  const completedGoals = userGoals.filter((g) => g.isCompleted);

  return (
    <div className="p-8 max-w-7xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-basketball-dark">🎯 Goals</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-6 py-3 bg-basketball-orange text-white rounded-lg font-semibold hover:bg-orange-600 transition"
        >
          {showForm ? 'Cancel' : '+ New Goal'}
        </button>
      </div>

      {/* Create Goal Form */}
      {showForm && (
        <div className="bg-white p-8 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-bold mb-6">Create New Goal</h2>
          <form onSubmit={handleCreateGoal} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Goal Title</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-basketball-orange"
                placeholder="e.g., Shoot 80% from free throw line"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-basketball-orange"
                placeholder="Describe your goal in detail..."
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Target Value</label>
                <input
                  type="number"
                  required
                  value={formData.target}
                  onChange={(e) => setFormData({ ...formData, target: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-basketball-orange"
                  placeholder="e.g., 80"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Unit</label>
                <input
                  type="text"
                  required
                  value={formData.unit}
                  onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-basketball-orange"
                  placeholder="e.g., %"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Deadline</label>
              <input
                type="date"
                required
                value={formData.deadline}
                onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-basketball-orange"
              />
            </div>
            <button
              type="submit"
              className="w-full px-6 py-3 bg-court-green text-white rounded-lg font-semibold hover:bg-green-700 transition"
            >
              Create Goal
            </button>
          </form>
        </div>
      )}

      {/* Active Goals */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-basketball-dark mb-4">Active Goals ({activeGoals.length})</h2>
        {activeGoals.length > 0 ? (
          <div className="space-y-4">
            {activeGoals.map((goal) => {
              const daysLeft = Math.ceil(
                (new Date(goal.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
              );
              return (
                <div key={goal.id} className="bg-white p-6 rounded-lg shadow-md">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-basketball-dark">{goal.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{goal.description}</p>
                    </div>
                    <button
                      onClick={() => completeGoal(goal.id)}
                      className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                    >
                      ✓ Complete
                    </button>
                  </div>
                  <div className="flex justify-between items-center text-sm text-gray-700">
                    <p>
                      Progress: <strong>{goal.currentValue}</strong> / <strong>{goal.targetValue}</strong> {goal.unit}
                    </p>
                    <p className={daysLeft < 7 ? 'text-red-600 font-semibold' : ''}>
                      {daysLeft} days left ⏰
                    </p>
                  </div>
                  <div className="w-full bg-gray-300 rounded-full h-3 mt-3 overflow-hidden">
                    <div
                      className="bg-basketball-orange h-full transition-all duration-500"
                      style={{ width: `${Math.min((goal.currentValue / goal.targetValue) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-gray-600 text-center py-8 bg-white rounded-lg">No active goals. Set your first goal! 🎯</p>
        )}
      </div>

      {/* Completed Goals */}
      {completedGoals.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-basketball-dark mb-4">Completed Goals ✓ ({completedGoals.length})</h2>
          <div className="space-y-4">
            {completedGoals.map((goal) => (
              <div key={goal.id} className="bg-green-50 p-6 rounded-lg shadow-md border border-green-200">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-green-700">{goal.title} ✓</h3>
                    <p className="text-sm text-gray-600 mt-1">{goal.description}</p>
                  </div>
                  <button
                    onClick={() => deleteGoal(goal.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Goals;
