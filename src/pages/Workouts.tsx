import { useAuthStore, useTrainingStore } from '../store';
import { useState } from 'react';
import { CompletedWorkout, CompletedExercise } from '../types';

const Workouts: React.FC = () => {
  const user = useAuthStore((state) => state.user);
  const trainingPlans = useTrainingStore((state) => state.trainingPlans);
  const completedWorkouts = useTrainingStore((state) => state.completedWorkouts);
  const addCompletedWorkout = useTrainingStore((state) => state.addCompletedWorkout);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    duration: 30,
    rating: 3,
    notes: '',
  });

  const activePlan = trainingPlans.find((p) => p.userId === user?.id && p.isActive);
  const userWorkouts = completedWorkouts.filter((w) => w.userId === user?.id);

  const handleLogWorkout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !activePlan) return;

    const newWorkout: CompletedWorkout = {
      id: Date.now().toString(),
      userId: user.id,
      workoutId: Date.now().toString(),
      trainingPlanId: activePlan.id,
      completedDate: new Date(),
      duration: formData.duration,
      exercises: [],
      notes: formData.notes,
      rating: formData.rating,
    };

    addCompletedWorkout(newWorkout);
    setFormData({ duration: 30, rating: 3, notes: '' });
    setShowForm(false);
  };

  return (
    <div className="p-8 max-w-7xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-basketball-dark">💪 Workouts</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          disabled={!activePlan}
          className={`px-6 py-3 rounded-lg font-semibold transition ${
            activePlan
              ? 'bg-basketball-orange text-white hover:bg-orange-600'
              : 'bg-gray-400 text-white cursor-not-allowed'
          }`}
        >
          {showForm ? 'Cancel' : '+ Log Workout'}
        </button>
      </div>

      {!activePlan && (
        <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg mb-8 text-yellow-800">
          ⚠️ You need an active training plan to log workouts. Create one from the Training Plans section.
        </div>
      )}

      {/* Log Workout Form */}
      {showForm && activePlan && (
        <div className="bg-white p-8 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-bold mb-6">Log Your Workout</h2>
          <form onSubmit={handleLogWorkout} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Duration (minutes)</label>
              <input
                type="number"
                min="1"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-basketball-orange"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">How was the workout? ⭐</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    type="button"
                    onClick={() => setFormData({ ...formData, rating })}
                    className={`px-4 py-2 rounded-lg font-semibold transition ${
                      formData.rating === rating
                        ? 'bg-basketball-orange text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {rating}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Notes</label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-basketball-orange"
                placeholder="How did the workout go? Any improvements?"
                rows={3}
              />
            </div>
            <button
              type="submit"
              className="w-full px-6 py-3 bg-court-green text-white rounded-lg font-semibold hover:bg-green-700 transition"
            >
              Log Workout
            </button>
          </form>
        </div>
      )}

      {/* Workouts History */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-basketball-dark mb-6">Workout History</h2>
        {userWorkouts.length > 0 ? (
          <div className="space-y-4">
            {userWorkouts
              .sort(
                (a, b) =>
                  new Date(b.completedDate).getTime() - new Date(a.completedDate).getTime()
              )
              .map((workout) => (
                <div key={workout.id} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="font-semibold text-lg">
                        {new Date(workout.completedDate).toLocaleDateString('en-US', {
                          weekday: 'short',
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </p>
                      <p className="text-sm text-gray-600">{workout.duration} minutes</p>
                    </div>
                    <div className="text-2xl">{'⭐'.repeat(workout.rating)}</div>
                  </div>
                  {workout.notes && <p className="text-gray-700 text-sm italic">"{workout.notes}"</p>}
                </div>
              ))}
          </div>
        ) : (
          <p className="text-gray-600 text-center py-8">No workouts logged yet. Start your training! 🏀</p>
        )}
      </div>
    </div>
  );
};

export default Workouts;
