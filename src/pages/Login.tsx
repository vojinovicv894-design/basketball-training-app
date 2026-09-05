import { useState } from 'react';
import { useAuthStore } from '../store';
import { User } from '../types';

interface LoginProps {
  onLoginSuccess: () => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const login = useAuthStore((state) => state.login);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    skillLevel: 'beginner' as const,
    position: 'multi' as const,
    age: 20,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const user: User = {
      id: Date.now().toString(),
      name: formData.name,
      email: formData.email,
      skillLevel: formData.skillLevel,
      position: formData.position,
      age: formData.age,
      joinedDate: new Date(),
    };
    login(user);
    onLoginSuccess();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-basketball-dark to-basketball-orange flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">🏀</div>
          <h1 className="text-3xl font-bold text-basketball-dark">Basketball Training</h1>
          <p className="text-gray-600 mt-2">Personalized Skills Development</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-basketball-orange"
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-basketball-orange"
              placeholder="your.email@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Age</label>
            <input
              type="number"
              min="10"
              max="100"
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-basketball-orange"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Skill Level</label>
            <select
              value={formData.skillLevel}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  skillLevel: e.target.value as 'beginner' | 'intermediate' | 'advanced',
                })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-basketball-orange"
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Position</label>
            <select
              value={formData.position}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  position: e.target.value as 'PG' | 'SG' | 'SF' | 'PF' | 'C' | 'multi',
                })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-basketball-orange"
            >
              <option value="multi">Multi Position</option>
              <option value="PG">Point Guard (PG)</option>
              <option value="SG">Shooting Guard (SG)</option>
              <option value="SF">Small Forward (SF)</option>
              <option value="PF">Power Forward (PF)</option>
              <option value="C">Center (C)</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full px-6 py-3 bg-gradient-to-r from-basketball-orange to-orange-600 text-white rounded-lg font-semibold hover:shadow-lg transition transform hover:scale-105"
          >
            Get Started
          </button>
        </form>

        <p className="text-center text-gray-600 text-sm mt-6">
          Ready to level up your game? 🏆
        </p>
      </div>
    </div>
  );
};

export default Login;
