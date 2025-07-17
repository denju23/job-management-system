import { useAuth } from '../context/AuthContext';
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';

const DashboardLayout = () => {
  const { user } = useAuth();

  return (
    <div className="container-fluid">
      <div className="row min-vh-100">
        {/* Sidebar */}
        <div className="col-md-3 bg-light p-4 shadow-sm">
          <h5 className="mb-4">Dashboard</h5>
          <ul className="nav flex-column">
            {user.role === 'admin' ? (
              <>
                <li className="nav-item mb-2">
                  <Link className="nav-link" to="/admin/jobs">Manage Jobs</Link>
                </li>
                <li className="nav-item mb-2">
                  <Link className="nav-link" to="/dashboard">Admin Home</Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item mb-2">
                  <Link className="nav-link" to="/jobs">My Jobs</Link>
                </li>
                <li className="nav-item mb-2">
                  <Link className="nav-link" to="/dashboard">User Home</Link>
                </li>
              </>
            )}
          </ul>
        </div>

        {/* Main Content */}
        <div className="col-md-9 p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
