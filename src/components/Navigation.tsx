interface NavigationProps {
  currentPage: string;
  onPageChange: (page: any) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentPage, onPageChange }) => {
  const navItems = [
    { id: 'dashboard', label: '📊 Dashboard', icon: '📊' },
    { id: 'training-plans', label: '📋 Training Plans', icon: '📋' },
    { id: 'workouts', label: '💪 Workouts', icon: '💪' },
    { id: 'progress', label: '📈 Progress', icon: '📈' },
    { id: 'goals', label: '🎯 Goals', icon: '🎯' },
  ];

  return (
    <nav className="w-64 bg-white shadow-lg min-h-screen">
      <div className="p-6 space-y-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onPageChange(item.id)}
            className={`w-full text-left px-4 py-3 rounded-lg transition ${
              currentPage === item.id
                ? 'bg-basketball-orange text-white font-semibold'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;
