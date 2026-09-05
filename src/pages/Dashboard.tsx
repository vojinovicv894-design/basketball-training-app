import { useAuthStore, useTrainingStore } from '../store';
import { useEffect, useState } from 'react';
import { CompletedWorkout, SkillProgress } from '../types';

const Dashboard: React.FC = () => {
  const user = useAuthStore((state) => state.user);
  const trainingPlans = useTrainingStore((state) => state.trainingPlans);
  const completedWorkouts = useTrainingStore((state) => state.completedWorkouts);
  const goals = useTrainingStore((state) => state.goals);
  const skillProgress = useTrainingStore((state) => state.skillProgress);

  const activeplan = trainingPlans.find((p) => p.isActive);
  const userWorkouts = completedWorkouts.filter((w) => w.userId === user?.id);
  const weeklyWorkouts = userWorkouts.filter((w) => {
    const diffTime = Math.abs(new Date().getTime() - new Date(w.completedDate).getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7;
  });
  const completedGoals = goals.filter((g) => g.userId === user?.id && g.isCompleted);
  const activeGoals = goals.filter((g) => g.userId === user?.id && !g.isCompleted);

  return (
    <div className="p-8 max-w-7xl">
      <h1 className="text-4xl font-bold mb-8 text-basketball-dark">Welcome back, {user?.name}! 🏀</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-gray-600 text-sm font-semibold">This Week Workouts</p>
          <p className="text-3xl font-bold text-basketball-orange mt-2">{weeklyWorkouts.length}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-gray-600 text-sm font-semibold">Active Goals</p>
          <p className="text-3xl font-bold text-court-green mt-2">{activeGoals.length}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-gray-600 text-sm font-semibold">Completed Goals</p>
          <p className="text-3xl font-bold text-blue-500 mt-2">{completedGoals.length}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-gray-600 text-sm font-semibold">Total Workouts</p>
          <p className="text-3xl font-bold text-purple-500 mt-2">{userWorkouts.length}</p>
        </div>
      </div>

      {/* Active Training Plan */}
      {activeplan && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-bold text-basketball-dark mb-4">📋 Active Training Plan</h2>
          <div className="space-y-2">
            <p><strong>Plan:</strong> {activeplan.name}</p>
            <p><strong>Goal:</strong> {activeplan.goalDescription}</p>
            <p><strong>Frequency:</strong> {activeplan.frequency} workouts/week</p>
            <p><strong>Skills Focus:</strong> {activeplan.skillsToImprove.map((s) => s.name).join(', ')}</p>
            <p><strong>Start Date:</strong> {new Date(activeplan.startDate).toLocaleDateString()}</p>
          </div>
        </div>
      )}

      {/* Recent Workouts */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-basketball-dark mb-4">💪 Recent Workouts</h2>
        {userWorkouts.length > 0 ? (
          <div className="space-y-4">
            {userWorkouts.slice(-5).reverse().map((workout) => (
              <div key={workout.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-semibold">Workout {new Date(workout.completedDate).toLocaleDateString()}</p>
                  <p className="text-sm text-gray-600">{workout.duration} minutes</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">{'⭐'.repeat(Math.floor(workout.rating))}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No workouts completed yet. Start your first workout!</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
