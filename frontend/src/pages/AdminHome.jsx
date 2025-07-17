import { useJobs } from '../context/JobContext';

const AdminHome = () => {
  const { user } = useJobs();

  return (
    <div>
      <h2>Welcome Admin 👋</h2>
      <p className="lead">Hello <strong>{user?.name}</strong>, manage all jobs and users from here.</p>

      <div className="alert alert-info">
        This is your admin dashboard. You can access:
        <ul>
          <li><strong>All Jobs</strong> (with full control)</li>
          <li><strong>User Management</strong> (if implemented)</li>
          <li>View and manage job lifecycle</li>
        </ul>
      </div>
    </div>
  );
};

export default AdminHome;
