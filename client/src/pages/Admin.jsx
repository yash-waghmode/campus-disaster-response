import React, { useEffect, useMemo, useState } from 'react';
import { useAppContext } from '../context/AppContext';
import UserStatusTable, { INITIAL_STUDENTS } from '../components/admin/UserStatusTable';

function Admin() {
  const { isEmergency, setIsEmergency, userStatus } = useAppContext();
  const [students, setStudents] = useState(INITIAL_STUDENTS);

  useEffect(() => {
    const timer = setInterval(() => {
      setStudents((prev) =>
        prev.map((student) =>
          Math.random() > 0.55
            ? { ...student, lastPing: Date.now() - Math.floor(Math.random() * 8000) }
            : student
        )
      );
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  const roster = useMemo(() => {
    if (userStatus === 'unknown') return students;
    const self = {
      id: 'self',
      name: 'You (this device)',
      location: 'Room 102',
      status: userStatus === 'danger' ? 'Needs Help' : 'Safe',
      lastPing: Date.now(),
    };
    return [self, ...students];
  }, [students, userStatus]);

  const total = roster.length;
  const safeCount = roster.filter((student) => student.status === 'Safe').length;
  const emergencyCount = roster.filter((student) => student.status === 'Needs Help').length;

  return (
    <div style={{ padding: '24px', fontFamily: 'system-ui, sans-serif', maxWidth: '960px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '8px' }}>Admin Control Center</h1>
      <p style={{ color: '#64748b', marginTop: 0 }}>Live student monitoring and system-wide emergency override</p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '12px',
          marginBottom: '20px',
        }}
      >
        <MetricCard label="Total Students" value={total} accent="#1d4ed8" />
        <MetricCard label="Safe Count" value={safeCount} accent="#16a34a" />
        <MetricCard label="Emergency Count" value={emergencyCount} accent="#dc2626" />
      </div>

      <div
        style={{
          border: isEmergency ? '2px solid #dc2626' : '1px solid #e2e8f0',
          backgroundColor: isEmergency ? '#fff5f5' : '#f8fafc',
          padding: '20px',
          borderRadius: '10px',
          marginBottom: '24px',
        }}
      >
        <h2 style={{ marginTop: 0, fontSize: '1.1rem' }}>Master Emergency Override</h2>
        <p style={{ margin: '0 0 12px' }}>
          System mode:{' '}
          <strong style={{ color: isEmergency ? '#dc2626' : '#16a34a' }}>
            {isEmergency ? 'Emergency Mode ON' : 'Emergency Mode OFF'}
          </strong>
        </p>
        <label
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            cursor: 'pointer',
            fontWeight: 700,
          }}
        >
          <input
            type="checkbox"
            role="switch"
            checked={isEmergency}
            onChange={() => setIsEmergency((prev) => !prev)}
            aria-label="Master emergency override"
            style={{ width: '20px', height: '20px' }}
          />
          {isEmergency ? 'Deactivate Emergency Mode' : 'Activate Emergency Mode'}
        </label>
      </div>

      <h2 style={{ fontSize: '1.15rem' }}>Live student status</h2>
      <UserStatusTable students={roster} />
    </div>
  );
}

function MetricCard({ label, value, accent }) {
  return (
    <div
      style={{
        padding: '16px',
        borderRadius: '10px',
        border: `1px solid ${accent}33`,
        backgroundColor: '#ffffff',
        boxShadow: '0 1px 2px rgba(15, 23, 42, 0.06)',
      }}
    >
      <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>{label}</div>
      <div style={{ fontSize: '2rem', fontWeight: 800, color: accent, lineHeight: 1.2 }}>{value}</div>
    </div>
  );
}

export default Admin;
