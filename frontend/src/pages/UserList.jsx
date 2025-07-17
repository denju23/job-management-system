import { useEffect, useMemo, useState } from 'react';
import { useJobs } from '../context/JobContext';
import { getAllUsers } from '../services/userServices';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from '@tanstack/react-table';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const { user } = useJobs();

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers(user?.token);
        setUsers(data);
      } catch (err) {
        console.error('Failed to load users', err.message);
      }
    };

    fetchUsers();
  }, [user]);

  // Filter users
  const filteredUsers = useMemo(() => {
    return users.filter((u) =>
      [u.name, u.email, u.role].some((field) =>
        field.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [users, searchQuery]);

  // Define columns
  const columns = useMemo(
    () => [
      {
        header: 'Name',
        accessorKey: 'name',
      },
      {
        header: 'Email',
        accessorKey: 'email',
      },
      {
        header: 'Role',
        accessorKey: 'role',
        cell: (info) => (
          <span className={`badge bg-${info.getValue() === 'admin' ? 'danger' : 'secondary'}`}>
            {info.getValue()}
          </span>
        ),
      },
      {
        header: 'Registered At',
        accessorKey: 'createdAt',
        cell: (info) => new Date(info.getValue()).toLocaleDateString(),
      },
    ],
    []
  );

  const table = useReactTable({
    data: filteredUsers,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 10,
        pageIndex: 0,
      },
    },
  });

  // 🔁 Reset to page 1 on search
  useEffect(() => {
    table.setPageIndex(0);
  }, [searchQuery, table]);

  return (
    <div className="container mt-4">
      <h2>All Registered Users</h2>

      {/* Search Bar */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="🔍 Search by name, email, or role"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="table-responsive">
        <table className="table table-bordered align-middle">
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
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="text-center py-4 text-danger fw-semibold">
                  🚫 No users match your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="d-flex justify-content-between align-items-center mt-3">
        <div>
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </div>
        <div>
          <button
            className="btn btn-sm btn-primary me-2"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            ◀ Previous
          </button>
          <button
            className="btn btn-sm btn-primary"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next ▶
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserList;
