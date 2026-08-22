import React from 'react';

const CELLS = [
  { id: 'n-exit', label: 'North Exit', type: 'exit' },
  { id: 'quad', label: 'Quad', type: 'path' },
  { id: 'assembly-n', label: 'Assembly A', type: 'assembly' },
  { id: 'labs', label: 'Labs', type: 'building' },
  { id: 'you', label: 'You · Room 102', type: 'you' },
  { id: 'library', label: 'Library', type: 'building' },
  { id: 'w-exit', label: 'West Exit (blocked)', type: 'blocked' },
  { id: 'corridor', label: 'Main corridor', type: 'path' },
  { id: 'admin', label: 'Admin', type: 'building' },
  { id: 'classrooms', label: 'Classrooms', type: 'building' },
  { id: 's-exit', label: 'South Gate', type: 'exit' },
  { id: 'assembly-s', label: 'Assembly B', type: 'assembly' },
];

const TYPE_STYLES = {
  exit: { backgroundColor: '#166534', color: '#dcfce7', border: '2px solid #4ade80' },
  assembly: { backgroundColor: '#1e3a8a', color: '#dbeafe', border: '2px dashed #60a5fa' },
  path: { backgroundColor: '#365314', color: '#ecfccb', border: '2px solid #a3e635' },
  you: { backgroundColor: '#854d0e', color: '#fef9c3', border: '2px solid #facc15' },
  blocked: { backgroundColor: '#7f1d1d', color: '#fecaca', border: '2px solid #f87171' },
  building: { backgroundColor: '#1e293b', color: '#cbd5e1', border: '1px solid #475569' },
};

function EvacuationGrid() {
  return (
    <section aria-labelledby="evac-heading">
      <h2 id="evac-heading" style={{ fontSize: '1.1rem', marginBottom: '8px' }}>
        Campus evacuation layout
      </h2>
      <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginTop: 0 }}>
        Green cells are clear exit routes. Blue dashed cells are assembly points.
      </p>
      <div
        role="img"
        aria-label="Campus grid showing north and south exits, west blocked exit, corridor routes, and two assembly points"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '8px',
        }}
      >
        {CELLS.map((cell) => (
          <div
            key={cell.id}
            style={{
              minHeight: '72px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              padding: '8px',
              fontWeight: 700,
              fontSize: '0.85rem',
              ...TYPE_STYLES[cell.type],
            }}
          >
            {cell.label}
          </div>
        ))}
      </div>
    </section>
  );
}

export default EvacuationGrid;
