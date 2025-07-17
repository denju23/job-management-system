import api from './api';

// export const getJobs = () => api.get('/jobs');
export const getJobs = (params = {}) => {
  return api.get('/jobs', { params }); // Axios auto-formats query string
};
export const getAdminAllJobs = () => api.get('/jobs/admin');
export const createJob = (job) => api.post('/jobs', job);
export const updateJob = (id, job) => api.put(`/jobs/${id}`, job);
export const deleteJob = (id) => api.delete(`/jobs/${id}`);
