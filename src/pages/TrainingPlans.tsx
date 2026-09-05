import { useAuthStore, useTrainingStore } from '../store';
import { useState } from 'react';
import { TrainingPlan, Workout, Skill } from '../types';

const TrainingPlans: React.FC = () => {
  const user = useAuthStore((state) => state.user);
  const trainingPlans = useTrainingStore((state) => state.trainingPlans);
  const addTrainingPlan = useTrainingStore((state) => state.addTrainingPlan);
  const updateTrainingPlan = useTrainingStore((state) => state.updateTrainingPlan);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    goal: '',
    frequency: 3,
  });

  const handleCreatePlan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const newPlan: TrainingPlan = {
      id: Date.now().toString(),
      userId: user.id,
      name: formData.name,
      description: formData.description,
      goalDescription: formData.goal,
      workouts: [],
      frequency: formData.frequency,
      startDate: new Date(),
      skillsToImprove: [],
      isActive: trainingPlans.filter((p) => p.userId === user.id).length === 0,
      createdDate: new Date(),
    };

    addTrainingPlan(newPlan);
    setFormData({ name: '', description: '', goal: '', frequency: 3 });
    setShowForm(false);
  };

  const handleActivatePlan = (planId: string) => {
    const plan = trainingPlans.find((p) => p.id === planId);
    if (plan) {
      // Deactivate all other plans
      trainingPlans.forEach((p) => {
        if (p.isActive) {
          updateTrainingPlan({ ...p, isActive: false });
        }
      });
      updateTrainingPlan({ ...plan, isActive: true });
    }
  };

  const userPlans = trainingPlans.filter((p) => p.userId === user?.id);

  return (
    <div className="p-8 max-w-7xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-basketball-dark">📋 Training Plans</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-6 py-3 bg-basketball-orange text-white rounded-lg font-semibold hover:bg-orange-600 transition"
        >
          {showForm ? 'Cancel' : '+ New Plan'}
        </button>
      </div>

      {/* Create Plan Form */}
      {showForm && (
        <div className="bg-white p-8 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-bold mb-6">Create New Training Plan</h2>
          <form onSubmit={handleCreatePlan} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Plan Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-basketball-orange"
                placeholder="e.g., Summer Basketball Camp"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-basketball-orange"
                placeholder="Describe your training plan..."
                rows={3}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Main Goal</label>
              <input
                type="text"
                required
                value={formData.goal}
                onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-basketball-orange"
                placeholder="e.g., Improve shooting accuracy"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Workouts Per Week</label>
              <input
                type="number"
                min="1"
                max="7"
                value={formData.frequency}
                onChange={(e) => setFormData({ ...formData, frequency: parseInt(e.target.value) })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-basketball-orange"
              />
            </div>
            <button
              type="submit"
              className="w-full px-6 py-3 bg-court-green text-white rounded-lg font-semibold hover:bg-green-700 transition"
            >
              Create Plan
            </button>
          </form>
        </div>
      )}

      {/* Training Plans List */}
      <div className="space-y-6">
        {userPlans.length > 0 ? (
          userPlans.map((plan) => (
            <div key={plan.id} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-basketball-dark">{plan.name}</h3>
                  {plan.isActive && (
                    <span className="inline-block mt-2 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">Active</span>
                  )}
                </div>
                {!plan.isActive && (
                  <button
                    onClick={() => handleActivatePlan(plan.id)}
                    className="px-4 py-2 bg-basketball-orange text-white rounded-lg hover:bg-orange-600 transition"
                  >
                    Activate
                  </button>
                )}
              </div>
              <p className="text-gray-700 mb-3">{plan.description}</p>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Goal</p>
                  <p className="font-semibold">{plan.goalDescription}</p>
                </div>
                <div>
                  <p className="text-gray-600">Frequency</p>
                  <p className="font-semibold">{plan.frequency} workouts/week</p>
                </div>
                <div>
                  <p className="text-gray-600">Created</p>
                  <p className="font-semibold">{new Date(plan.createdDate).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <p className="text-xl text-gray-600">No training plans yet. Create one to get started! 🎯</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrainingPlans;
