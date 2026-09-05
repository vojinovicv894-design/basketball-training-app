import { useAuthStore } from '../store';

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  return (
    <header className="bg-basketball-dark text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="text-3xl">🏀</div>
          <h1 className="text-2xl font-bold">Basketball Training</h1>
        </div>
        <div className="flex items-center space-x-4">
          {user && (
            <>
              <div className="text-right">
                <p className="font-semibold">{user.name}</p>
                <p className="text-sm text-gray-400">{user.skillLevel}</p>
              </div>
              <button
                onClick={logout}
                className="px-4 py-2 bg-basketball-orange hover:bg-orange-600 rounded-lg transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
