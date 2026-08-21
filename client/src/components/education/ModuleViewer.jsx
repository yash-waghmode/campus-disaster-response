import React, { useState } from 'react';

const ModuleViewer = () => {
  const [activeTab, setActiveTab] = useState('visual');

  return (
    <div style={styles.container}>
      <div style={styles.tabs}>
        <button
          style={activeTab === 'visual' ? styles.activeTab : styles.tab}
          onClick={() => setActiveTab('visual')}
        >
          Visual Guide
        </button>
        <button
          style={activeTab === 'video' ? styles.activeTab : styles.tab}
          onClick={() => setActiveTab('video')}
        >
          Video Tutorial
        </button>
      </div>

      <div style={styles.content}>
        {activeTab === 'visual' ? (
          <div>
            <h3>Earthquake Safety: Drop, Cover, Hold On</h3>
            <p><strong>Step 1:</strong> DROP to your hands and knees.</p>
            <p><strong>Step 2:</strong> COVER your head and neck under a sturdy desk or table.</p>
            <p><strong>Step 3:</strong> HOLD ON to your shelter until shaking stops.</p>
            <div style={styles.placeholderImage}>
              [Evacuation Diagram / Visual Assets Go Here]
            </div>
          </div>
        ) : (
          <div>
            <h3>Demonstration Video</h3>
            <iframe
              width="100%"
              height="315"
              src="https://www.youtube.com/embed/ScXX2bvdJbQ" 
              title="Disaster Preparedness Video"
              style={{ border: 'none', borderRadius: '4px' }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto',
    fontFamily: 'sans-serif'
  },
  tabs: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px'
  },
  tab: {
    padding: '10px 20px',
    cursor: 'pointer',
    background: '#f1f5f9',
    border: 'none',
    borderRadius: '4px',
    fontWeight: 'bold',
    color: '#475569'
  },
  activeTab: {
    padding: '10px 20px',
    cursor: 'pointer',
    background: '#3b82f6',
    color: '#ffffff',
    border: 'none',
    borderRadius: '4px',
    fontWeight: 'bold'
  },
  content: {
    padding: '15px',
    background: '#f8fafc',
    borderRadius: '4px',
    border: '1px solid #e2e8f0'
  },
  placeholderImage: {
    width: '100%',
    height: '250px',
    background: '#cbd5e1',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '15px',
    borderRadius: '4px',
    color: '#475569',
    fontWeight: 'bold'
  }
};

export default ModuleViewer;
