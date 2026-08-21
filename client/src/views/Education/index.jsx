import React from 'react';

const disasterModules = [
  { id: 1, title: 'Earthquake Drill', description: 'Drop, Cover, and Hold On techniques.', duration: '5 mins', icon: '🌍' },
  { id: 2, title: 'Fire Evacuation', description: 'Navigating smoke and finding safe campus exits.', duration: '8 mins', icon: '🔥' },
  { id: 3, title: 'Flood & Storm Safety', description: 'High-ground routes and electrical safety.', duration: '6 mins', icon: '🌊' },
  { id: 4, title: 'Basic First Aid', description: 'CPR basics and reporting injuries to campus admin.', duration: '10 mins', icon: '⚕️' },
];

export default function EducationDashboard() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: '1200px', margin: '0 auto' }}>
      <h2 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>Disaster Preparedness Modules</h2>
      <p style={{ color: '#666', marginBottom: '2rem' }}>Select a module below to begin your safety training.</p>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
        gap: '1.5rem' 
      }}>
        {disasterModules.map((mod) => (
          <div 
            key={mod.id} 
            style={{ 
              border: '1px solid #e0e0e0', 
              borderRadius: '8px', 
              padding: '1.5rem', 
              cursor: 'pointer', 
              backgroundColor: '#fff',
              boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
            }}
          >
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{mod.icon}</div>
            <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.25rem' }}>{mod.title}</h3>
            <p style={{ margin: '0 0 1rem 0', color: '#555', lineHeight: '1.4' }}>{mod.description}</p>
            <span style={{ fontSize: '0.875rem', fontWeight: '600', color: '#0056b3' }}>
              ⏱ {mod.duration}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
