import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleNavbar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-3">
      <Link className="navbar-brand" to={user ? "/dashboard" : "/login"}>
        Job Manager
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        onClick={toggleNavbar}
        aria-expanded={!isCollapsed}
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className={`collapse navbar-collapse ${!isCollapsed ? 'show' : ''}`}>
        {user?.token ? (
          <>
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/dashboard" onClick={toggleNavbar}>
                  Dashboard
                </Link>
              </li>

              {user.role === 'admin' && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/admin/jobs" onClick={toggleNavbar}>
                      All Jobs
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/admin/users" onClick={toggleNavbar}>
                      User List
                    </Link>
                  </li>
                </>
              )}

              {/* {user.role === 'user' && (
                <li className="nav-item">
                  <Link className="nav-link" to="/my-jobs" onClick={toggleNavbar}>
                    My Jobs
                  </Link>
                </li>
              )} */}
              <li className="nav-item">
                <Link className="nav-link" to="/jobs" onClick={toggleNavbar}>
                  My Jobs
                </Link>
              </li>
            </ul>

            <div className="d-flex align-items-center gap-2 ms-auto">
              <span className="navbar-text text-white">
                Hello, <strong>{user.name}</strong>
              </span>
              <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </>
        ) : (
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/login" onClick={toggleNavbar}>
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/register" onClick={toggleNavbar}>
                Register
              </Link>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
