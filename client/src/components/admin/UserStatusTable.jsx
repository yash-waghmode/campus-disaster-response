// client/src/components/admin/UserStatusTable.jsx
import React from 'react';

const mockStatuses = [
  { id: 1, name: 'Aarav Sharma', role: 'Student', location: 'Block A - Room 204', status: 'Safe', lastUpdated: '10:12 AM' },
  { id: 2, name: 'Priya Patel', role: 'Student', location: 'Library - Floor 2', status: 'Trapped', lastUpdated: '10:14 AM' },
  { id: 3, name: 'Rohan Verma', role: 'Student', location: 'Science Lab 3', status: 'Need First Aid', lastUpdated: '10:15 AM' },
  { id: 4, name: 'Ananya Gupta', role: 'Student', location: 'Block B - Main Gate', status: 'Safe', lastUpdated: '10:18 AM' }
];

const getStatusBadge = (status) => {
  switch (status) {
    case 'Safe':
      return <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-green-100 text-green-800">Safe</span>;
    case 'Trapped':
      return <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-red-100 text-red-800">Trapped</span>;
    case 'Need First Aid':
      return <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-amber-100 text-amber-800">Need First Aid</span>;
    default:
      return <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-gray-100 text-gray-800">{status}</span>;
  }
};

export default function UserStatusTable({ users = mockStatuses }) {
  return (
    <div className="w-full overflow-x-auto shadow-md rounded-lg border border-gray-200">
      <table className="w-full text-sm text-left text-gray-700">
        <thead className="text-xs uppercase bg-gray-100 text-gray-700">
          <tr>
            <th scope="col" className="px-6 py-3">Name</th>
            <th scope="col" className="px-6 py-3">Role</th>
            <th scope="col" className="px-6 py-3">Location</th>
            <th scope="col" className="px-6 py-3">Status</th>
            <th scope="col" className="px-6 py-3">Last Updated</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="bg-white border-b hover:bg-gray-50">
              <td className="px-6 py-4 font-semibold text-gray-900">{user.name}</td>
              <td className="px-6 py-4">{user.role}</td>
              <td className="px-6 py-4">{user.location}</td>
              <td className="px-6 py-4">{getStatusBadge(user.status)}</td>
              <td className="px-6 py-4 text-gray-500">{user.lastUpdated}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
