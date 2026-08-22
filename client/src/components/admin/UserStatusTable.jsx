import React, { useEffect, useMemo, useState } from 'react';

export const INITIAL_STUDENTS = [
  { id: 1, name: 'Aarav Sharma', location: 'Block A · Room 204', status: 'Safe', lastPing: Date.now() - 18000 },
  { id: 2, name: 'Priya Patel', location: 'Library · Floor 2', status: 'Needs Help', lastPing: Date.now() - 9000 },
  { id: 3, name: 'Rohan Verma', location: 'Science Lab 3', status: 'Needs Help', lastPing: Date.now() - 27000 },
  { id: 4, name: 'Ananya Gupta', location: 'Block B · Main Gate', status: 'Safe', lastPing: Date.now() - 5000 },
  { id: 5, name: 'Kabir Singh', location: 'Auditorium', status: 'Safe', lastPing: Date.now() - 41000 },
  { id: 6, name: 'Meera Iyer', location: 'Cafeteria', status: 'Needs Help', lastPing: Date.now() - 12000 },
];

const FILTERS = ['All', 'Safe', 'Needs Help'];

function formatPing(timestamp, now) {
  const seconds = Math.max(0, Math.floor((now - timestamp) / 1000));
  if (seconds < 5) return 'Just now';
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  return `${minutes}m ${seconds % 60}s ago`;
}

function UserStatusTable({ students }) {
  const [filter, setFilter] = useState('All');
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  const visibleStudents = useMemo(() => {
    if (filter === 'All') return students;
    return students.filter((student) => student.status === filter);
  }, [filter, students]);

  return (
    <section>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
        {FILTERS.map((option) => {
          const active = filter === option;
          return (
            <button
              key={option}
              type="button"
              onClick={() => setFilter(option)}
              aria-pressed={active}
              style={{
                padding: '8px 14px',
                borderRadius: '999px',
                border: '1px solid #cbd5e1',
                cursor: 'pointer',
                fontWeight: 600,
                backgroundColor: active ? '#0f172a' : '#ffffff',
                color: active ? '#ffffff' : '#0f172a',
              }}
            >
              {option}
            </button>
          );
        })}
      </div>

      <div style={{ overflowX: 'auto', border: '1px solid #e2e8f0', borderRadius: '10px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.95rem' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8fafc', textAlign: 'left' }}>
              <th scope="col" style={thStyle}>Name</th>
              <th scope="col" style={thStyle}>Location</th>
              <th scope="col" style={thStyle}>Status</th>
              <th scope="col" style={thStyle}>Last Ping Time</th>
            </tr>
          </thead>
          <tbody>
            {visibleStudents.length === 0 ? (
              <tr>
                <td colSpan={4} style={{ ...tdStyle, textAlign: 'center', color: '#64748b' }}>
                  No students match this filter.
                </td>
              </tr>
            ) : (
              visibleStudents.map((student) => (
                <tr key={student.id} style={{ borderTop: '1px solid #e2e8f0' }}>
                  <td style={{ ...tdStyle, fontWeight: 600 }}>{student.name}</td>
                  <td style={tdStyle}>{student.location}</td>
                  <td style={tdStyle}>
                    <span
                      style={{
                        display: 'inline-block',
                        padding: '4px 10px',
                        borderRadius: '999px',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        backgroundColor: student.status === 'Safe' ? '#dcfce7' : '#ffedd5',
                        color: student.status === 'Safe' ? '#166534' : '#9a3412',
                      }}
                    >
                      {student.status}
                    </span>
                  </td>
                  <td style={{ ...tdStyle, color: '#475569', fontVariantNumeric: 'tabular-nums' }}>
                    {formatPing(student.lastPing, now)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

const thStyle = { padding: '12px 16px', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.04em' };
const tdStyle = { padding: '12px 16px' };

export default UserStatusTable;
