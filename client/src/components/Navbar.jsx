import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-indigo-600 text-white shadow">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/" className="text-lg font-bold">
          CRM
        </Link>
        <div className="flex items-center gap-3 text-sm">
          {user ? (
            <>
              <span className="hidden sm:inline">Hi, {user.name}</span>
              <button
                onClick={handleLogout}
                className="rounded bg-white/20 px-3 py-1.5 hover:bg-white/30"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:underline">
                Login
              </Link>
              <Link to="/register" className="rounded bg-white px-3 py-1.5 text-indigo-600">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
