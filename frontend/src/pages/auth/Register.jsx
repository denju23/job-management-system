import { useForm } from 'react-hook-form';
import { registerUser } from '../../services/authService'; // optional: your API call
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

const Register = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    // Set role to 'user' if not selected
    const payload = { ...data, role: data.role || 'user' };

    try {
      await registerUser(payload);
      toast.success('Registration successful!');
      navigate('/login');

    } catch (err) {
      toast.error(err?.response?.data?.message || 'Registration failed');
    }
  };

  useEffect(() => {
    reset(); // clean on mount
  }, []);
  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100">
      <div className="card shadow p-4 col-md-5 col-sm-10">
        <h3 className="text-center mb-4">Create Account</h3>
        <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
          <div className="form-group mb-3">
            <label>Name</label>
            <input
              type="text"
              className={`form-control ${errors.name ? 'is-invalid' : ''}`}
              {...register('name', {
                required: 'Name is required',
                minLength: {
                  value: 3,
                  message: 'Name must be at least 3 characters',
                },
              })}
            />
            {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
          </div>

          <div className="form-group mb-3">
            <label>Email</label>
            <input
              type="email"
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              autoComplete="off"

              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'Invalid email address',
                },
              })}
            />
            {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
          </div>

          <div className="form-group mb-3">
            <label>Password</label>
            <input
              type="password"
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              autoComplete="off"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters',
                },
              })}
            />
            {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
          </div>

          <div className="form-group mb-3">
            <label>Role (optional)</label>
            <select
              className="form-select"
              defaultValue=""
              {...register('role')}
            >
              <option value="">Select Role</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button type="submit" className="btn btn-success w-100">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
