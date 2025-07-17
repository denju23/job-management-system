import { useJobs } from '../context/JobContext';
import JobList from './jobs/JobList';

const MyJobs = () => {
  const { user } = useJobs();



  // JobList already filters by role inside the context
  return (
    <div>
      <h2>My Jobs</h2>
      <JobList />
    </div>
  );
};

export default MyJobs;
