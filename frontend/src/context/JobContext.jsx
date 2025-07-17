import { createContext, useContext, useState, useEffect } from 'react';
import {
  getJobs,
  createJob as apiCreate,
  updateJob as apiUpdate,
  deleteJob as apiDelete,
  getAdminAllJobs,
} from '../services/jobService';
import { toast } from 'react-toastify';
import { useAuth } from './AuthContext';
import { useLocation } from 'react-router-dom';


const JobContext = createContext();

export const JobProvider = ({ children }) => {
  const location = useLocation();

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const { user } = useAuth();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [jobToDelete, setJobToDelete] = useState(null);


  const fetchAdminJobs = async () => {
    setLoading(true);
    try {
      const res = await getAdminAllJobs();
      setJobs(res.data.data || res.data);
    } catch (err) {
      console.error('Failed to fetch admin jobs', err);
    } finally {
      setLoading(false);
    }
  };


  const fetchJobs = async (params = {}) => {
    const finalParams = { own: true, ...params }; // default to own=true, override if passed
    setLoading(true);
    try {
      const res = await getJobs(finalParams);
      setJobs(res.data.data || res.data);
    } catch (err) {
      console.error('Failed to fetch jobs', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.token) {
      if (location.pathname === '/admin/jobs') {
        fetchAdminJobs();
      } else {
        fetchJobs();
      }
    }
  }, [user, location.pathname]);

  const createJob = async (data) => {
    try {
      await apiCreate(data);
      toast.success('Job created successfully!');
      fetchJobs();
    } catch (err) {
      toast.error('Failed to create job');
    }
  };

  const updateJob = async (id, data) => {
    try {
      await apiUpdate(id, data);
      toast.success('Job updated successfully!');
      fetchJobs();
    } catch (err) {
      toast.error('Failed to update job');
    }
  };

  const deleteJob = async (id) => {
    try {
      await apiDelete(id);
      toast.success('Job deleted successfully!');
      fetchJobs();
    } catch (err) {
      toast.error('Failed to delete job');
    }
  };



  const openDeleteModal = (job) => {
    setJobToDelete(job);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setJobToDelete(null);
    setShowDeleteModal(false);
  };

  const confirmDeleteJob = async () => {
    if (jobToDelete) {
      try {
        await apiDelete(jobToDelete);
        toast.success('Job deleted successfully!');
        fetchJobs(); // Or fetchAdminJobs() if you're in admin context
      } catch (err) {
        toast.error('Failed to delete job');
      } finally {
        closeDeleteModal();
      }
    }
  };


  const openModal = (job = null) => {
    setSelectedJob(job);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedJob(null);
    setShowModal(false);
  };

  return (
    <JobContext.Provider
      value={{
        jobs,
        loading,
        showModal,
        selectedJob,
        search, setSearch,
        statusFilter, setStatusFilter,
        fetchJobs,
        fetchAdminJobs,
        createJob,
        updateJob,
        deleteJob,
        openModal,
        closeModal,
        showDeleteModal,
        openDeleteModal,
        closeDeleteModal,
        confirmDeleteJob,
        jobToDelete,
      }}
    >
      {children}
    </JobContext.Provider>
  );
};

export const useJobs = () => useContext(JobContext);
