import { useAuth } from '../context/AuthContext';
import AdminDashboard from '../pages/dashboard/AdminDashboard';
import UserDashboard from '../pages/dashboard/UserDashboard';

const DashboardRoute = () => {
  const { user } = useAuth();

  if (!user) return null;

  return user.role === 'admin' ? <AdminDashboard /> : <UserDashboard />;
};

export default DashboardRoute;
