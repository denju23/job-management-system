import { useJobs } from '../context/JobContext';

const Dashboard = () => {
  const { jobs } = useJobs();

  const total = jobs.length;
  const open = jobs.filter((job) => job.status === 'open').length;
  const inProgress = jobs.filter((job) => job.status === 'in progress').length;
  const done = jobs.filter((job) => job.status === 'done').length;

  return (
    <div>
      <h2>Dashboard</h2>
      <div className="row mt-4">
        <div className="col-md-3">
          <div className="card text-bg-primary">
            <div className="card-body">
              <h5>Total Jobs</h5>
              <h3>{total}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-bg-secondary">
            <div className="card-body">
              <h5>Open</h5>
              <h3>{open}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-bg-warning">
            <div className="card-body">
              <h5>In Progress</h5>
              <h3>{inProgress}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-bg-success">
            <div className="card-body">
              <h5>Completed</h5>
              <h3>{done}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
