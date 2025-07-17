import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
} from '@tanstack/react-table';

import { useMemo, useEffect, useState } from 'react';
import { useJobs } from '../../context/JobContext';
import JobFormModal from '../../components/JobFormModal';
import { useLocation } from 'react-router-dom';
import ConfirmDeleteModal from '../../components/ConfirmDeleteModal';

const JobList = () => {
  const {
    jobs,
    showModal,
    selectedJob,
    openModal,
    closeModal,
    createJob,
    updateJob,
    deleteJob,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    openDeleteModal,
    showDeleteModal,
    closeDeleteModal,
    confirmDeleteJob,
    jobToDelete,
  } = useJobs();
  const location = useLocation();
  const isAdminJobsRoute = location.pathname === '/admin/jobs';
  const [pageIndex, setPageIndex] = useState(0);
  const pageSize = 8;

  // 🔍 Filtered data
  const filteredJobs = useMemo(() => {
    const lowerSearch = search.toLowerCase();
    return jobs.filter((job) => {
      const matchesSearch =
        job.title.toLowerCase().includes(lowerSearch) ||
        job.description.toLowerCase().includes(lowerSearch);

      const matchesStatus = statusFilter === 'all' || job.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [jobs, search, statusFilter]);

  useEffect(() => {
    setPageIndex(0); // Reset to first page when filters change
  }, [search, statusFilter]);

  const paginatedJobs = useMemo(() => {
    const start = pageIndex * pageSize;
    return filteredJobs.slice(start, start + pageSize);
  }, [filteredJobs, pageIndex]);

  const pageCount = Math.ceil(filteredJobs.length / pageSize);

  const columns = useMemo(
    () => [
      {
        header: 'Title',
        accessorKey: 'title',
        cell: (info) => {
          const fullText = info.getValue();
          const shortText = fullText.length > 8 ? fullText.slice(0, 15) + '...' : fullText;
          return <div title={fullText} className="ellipsis-cell">{shortText}</div>;
        }
      },
      {
        header: 'Description',
        accessorKey: 'description',
        cell: (info) => {
          const fullText = info.getValue();
          const shortText = fullText.length > 15 ? fullText.slice(0, 15) + '...' : fullText;
          return <div title={fullText} className="ellipsis-cell">{shortText}</div>;
        }
      },
      {
        header: 'Status',
        accessorKey: 'status',
        cell: (info) => {
          const value = info.getValue();
          let color = 'secondary';
          if (value === 'done') color = 'success';
          else if (value === 'in progress') color = 'warning';
          else if (value === 'open') color = 'secondary';

          return <span className={`badge bg-${color}`}>{value}</span>;
        },
      },
      {
        header: 'Actions',
        cell: ({ row }) => (
          <>
            <button
              className="btn btn-sm btn-primary me-2"
              onClick={() => openModal(row.original)}
            >
              Edit
            </button>
            <button
              className="btn btn-sm btn-danger"
              onClick={() => {
                openDeleteModal(row.original._id)
                // if (window.confirm('Are you sure you want to delete this job?')) {
                //   deleteJob(row.original._id);
                // }
              }}
            >
              Delete
            </button>
          </>
        ),
      },
    ],
    [openModal, deleteJob]
  );

  const table = useReactTable({
    data: paginatedJobs,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    pageCount,
    manualPagination: true,
    state: {
      pagination: {
        pageIndex,
        pageSize,
      },
    },
  });

  const handleSubmit = async (formData) => {
    if (selectedJob) {
      await updateJob(selectedJob._id, formData);
    } else {
      await createJob(formData);
    }
    closeModal();
  };

  return (
    <>
      <div>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3>Job List</h3>

          {!isAdminJobsRoute && (
            <button className="btn btn-success" onClick={() => openModal(null)}>
              + Create Job
            </button>

          )}

        </div>

        {/* 🔍 Filters */}
        <div className="row mb-3">
          <div className="col-md-6 mb-2">
            <input
              type="text"
              className="form-control"
              placeholder="🔍 Search title or description"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="col-md-4 mb-2">
            <select
              className="form-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="open">Open</option>
              <option value="in progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>
        </div>

        {/* 📋 Table */}
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="table-light">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id}>
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {paginatedJobs.length === 0 ? (
                <tr>
                  <td colSpan={columns.length} className="text-center">
                    No match found
                  </td>
                </tr>
              ) : (
                table.getRowModel().rows.map((row) => (
                  <tr key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* 🔁 Pagination */}
        <div className="d-flex justify-content-between align-items-center mt-3">
          <div>
            Page {pageIndex + 1} of {pageCount || 1}
          </div>
          <div className="btn-group">
            <button
              className="btn btn-outline-primary"
              onClick={() => setPageIndex((prev) => Math.max(prev - 1, 0))}
              disabled={pageIndex === 0}
            >
              Previous
            </button>
            <button
              className="btn btn-outline-primary"
              onClick={() => setPageIndex((prev) => (prev + 1 < pageCount ? prev + 1 : prev))}
              disabled={pageIndex + 1 >= pageCount}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* ✏️ Modal for Create/Edit */}
      <JobFormModal
        show={showModal}
        onClose={closeModal}
        onSubmit={handleSubmit}
        initialData={selectedJob}
      />
      {/* Confirm Delete Modal */}
      <ConfirmDeleteModal
        show={showDeleteModal}
        onClose={closeDeleteModal}
        onConfirm={confirmDeleteJob}
        jobTitle={jobToDelete?.title}
      />
    </>
  );
};

export default JobList;
