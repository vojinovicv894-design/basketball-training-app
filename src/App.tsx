import { useState } from 'react';
import { useAuthStore } from '../store';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import Dashboard from '../pages/Dashboard';
import TrainingPlans from '../pages/TrainingPlans';
import Workouts from '../pages/Workouts';
import Progress from '../pages/Progress';
import Goals from '../pages/Goals';
import Login from '../pages/Login';

type PageType = 'dashboard' | 'training-plans' | 'workouts' | 'progress' | 'goals' | 'login';

function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('login');
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return <Login onLoginSuccess={() => setCurrentPage('dashboard')} />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'training-plans':
        return <TrainingPlans />;
      case 'workouts':
        return <Workouts />;
      case 'progress':
        return <Progress />;
      case 'goals':
        return <Goals />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Navigation currentPage={currentPage} onPageChange={setCurrentPage} />
        <main className="flex-1">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}

export default App;
