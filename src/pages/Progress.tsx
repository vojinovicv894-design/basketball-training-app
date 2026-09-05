import { useAuthStore, useTrainingStore } from '../store';

const Progress: React.FC = () => {
  const user = useAuthStore((state) => state.user);
  const skillProgress = useTrainingStore((state) => state.skillProgress);
  const completedWorkouts = useTrainingStore((state) => state.completedWorkouts);

  const userProgress = skillProgress.filter((p) => p.userId === user?.id);
  const userWorkouts = completedWorkouts.filter((w) => w.userId === user?.id);

  const getProgressTrend = (workoutCount: number): string => {
    if (workoutCount < 5) return 'Getting Started';
    if (workoutCount < 15) return 'Building Momentum';
    if (workoutCount < 30) return 'Consistent Trainer';
    return 'Elite Dedication';
  };

  const averageRating =
    userWorkouts.length > 0
      ? (userWorkouts.reduce((sum, w) => sum + w.rating, 0) / userWorkouts.length).toFixed(1)
      : '0';

  return (
    <div className="p-8 max-w-7xl">
      <h1 className="text-4xl font-bold text-basketball-dark mb-8">📈 Your Progress</h1>

      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-basketball-orange to-orange-600 text-white p-8 rounded-lg shadow-lg">
          <p className="text-sm font-semibold opacity-90">Total Workouts</p>
          <p className="text-4xl font-bold mt-2">{userWorkouts.length}</p>
          <p className="text-xs opacity-75 mt-2">Keep pushing! 💪</p>
        </div>
        <div className="bg-gradient-to-br from-court-green to-green-700 text-white p-8 rounded-lg shadow-lg">
          <p className="text-sm font-semibold opacity-90">Average Rating</p>
          <p className="text-4xl font-bold mt-2">{averageRating} ⭐</p>
          <p className="text-xs opacity-75 mt-2">Great effort!</p>
        </div>
        <div className="bg-gradient-to-br from-blue-500 to-blue-700 text-white p-8 rounded-lg shadow-lg">
          <p className="text-sm font-semibold opacity-90">Training Status</p>
          <p className="text-2xl font-bold mt-2">{getProgressTrend(userWorkouts.length)}</p>
          <p className="text-xs opacity-75 mt-2">Level up! 🎯</p>
        </div>
      </div>

      {/* Skill Progress */}
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-basketball-dark mb-6">Skill Development</h2>
        {userProgress.length > 0 ? (
          <div className="space-y-6">
            {userProgress.map((skill) => (
              <div key={skill.skillId}>
                <div className="flex justify-between items-center mb-2">
                  <p className="font-semibold text-gray-800">{skill.skillName}</p>
                  <p className="text-lg font-bold text-basketball-orange">{skill.level}%</p>
                </div>
                <div className="w-full bg-gray-300 rounded-full h-4 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-basketball-orange to-orange-600 h-full transition-all duration-500"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-600 mt-1">
                  Last updated: {new Date(skill.lastUpdated).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-center py-8">
            No skill progress tracked yet. Complete workouts to start tracking! 📊
          </p>
        )}
      </div>

      {/* Weekly Activity */}
      <div className="mt-8 bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-basketball-dark mb-6">This Month</h2>
        <div className="grid grid-cols-7 gap-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="text-center">
              <p className="text-xs font-semibold text-gray-600 mb-2">{day}</p>
            </div>
          ))}
        </div>
        <p className="text-sm text-gray-600 mt-6 text-center">
          📅 Keep a consistent training schedule to maximize your progress!
        </p>
      </div>
    </div>
  );
};

export default Progress;
