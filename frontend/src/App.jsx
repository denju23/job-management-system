import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardLayout from './layouts/DashboardLayout';

import DashboardRoute from './components/DashboardRoute';
import JobList from './pages/jobs/JobList';
import MyJobs from './pages/myJobs';
import AdminHome from './pages/AdminHome';
import UserList from './pages/UserList';
import AdminJobList from './pages/AdminJobList';

function App() {
  return (
    <>
      {/* <Router> */}
      <Navbar />
      <Routes>
        {/* Public routes */}
        {/* <Route path="/" element={<DashboardLayout />} />
         */}
        <Route path="/" element={<Login/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Dashboard layout protected */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardRoute />} />
        </Route>

        {/* Jobs Page */}
        <Route
          path="/jobs"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<JobList />} />
        </Route>
        <Route
          path="/admin/jobs"
          element={
            <AdminJobList />

          }
        />

        {/* My Jobs */}
        <Route
          path="/my-jobs"
          element={
            <ProtectedRoute roles={['user']}>
              <MyJobs />
            </ProtectedRoute>
          }
        />

        {/* Admin Home */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute roles={['admin']}>
              <AdminHome />
            </ProtectedRoute>
          }
        />

        {/* Admin User List */}
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute roles={['admin']}>
              <UserList />
            </ProtectedRoute>
          }
        />

        {/* 404 fallback */}
        <Route path="*" element={<div className="text-center">404 | Page Not Found</div>} />
      </Routes>
      {/* // </Router> */}
    </>

  );
}

export default App;
