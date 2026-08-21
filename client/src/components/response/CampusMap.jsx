import React, { useState } from 'react';

const CampusMap = ({ userLocation = { x: 150, y: 450, zone: 'Room 102' } }) => {
  const [activeExit, setActiveExit] = useState(null);
  const [showPath, setShowPath] = useState(true);

  // Designated exits
  const exitPoints = [
    { id: 'exit-1', name: 'North Emergency Exit', x: 400, y: 50, status: 'CLEAR' },
    { id: 'exit-2', name: 'Main Gate (South)', x: 400, y: 550, status: 'CLEAR' },
    { id: 'exit-3', name: 'West Fire Exit', x: 50, y: 300, status: 'BLOCKED' }
  ];

  // Calculated primary safe route points (SVG polyline coordinates)
  const primaryRoute = "150,450 150,300 400,300 400,80";

  return (
    <div className="w-full max-w-4xl mx-auto p-4 bg-slate-900 text-white rounded-xl shadow-2xl border border-red-500/30">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-bold text-red-500 tracking-wide uppercase">Emergency Evacuation Blueprint</h2>
          <p className="text-xs text-slate-400">Current Location: <span className="text-yellow-400 font-semibold">{userLocation.zone}</span></p>
        </div>
        <button
          onClick={() => setShowPath(!showPath)}
          className="px-3 py-1.5 text-xs font-semibold rounded bg-red-600 hover:bg-red-500 transition-colors"
        >
          {showPath ? 'Hide Safe Route' : 'Show Safe Route'}
        </button>
      </div>

      <div className="relative border border-slate-700 bg-slate-950 rounded-lg overflow-hidden">
        <svg viewBox="0 0 800 600" className="w-full h-auto select-none">
          {/* Floor Plan Grid / Background */}
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e293b" strokeWidth="1" />
            </pattern>
            <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#22c55e" />
            </marker>
          </defs>

          <rect width="800" height="600" fill="#090d16" />
          <rect width="800" height="600" fill="url(#grid)" />

          {/* Building Outlines & Rooms */}
          <g stroke="#334155" strokeWidth="3" fill="#0f172a">
            {/* Main Corridor */}
            <rect x="100" y="250" width="600" height="100" fill="#1e293b" opacity="0.5" />
            <rect x="350" y="50" width="100" height="500" fill="#1e293b" opacity="0.5" />

            {/* Block A - Classrooms */}
            <rect x="50" y="50" width="250" height="180" />
            <text x="175" y="140" fill="#64748b" textAnchor="middle" fontSize="14">Block A (Labs)</text>

            <rect x="50" y="370" width="250" height="180" />
            <text x="175" y="460" fill="#64748b" textAnchor="middle" fontSize="14">Block B (Classrooms)</text>

            {/* Block B - Auditorium */}
            <rect x="500" y="50" width="250" height="180" />
            <text x="625" y="140" fill="#64748b" textAnchor="middle" fontSize="14">Auditorium</text>

            <rect x="500" y="370" width="250" height="180" />
            <text x="625" y="460" fill="#64748b" textAnchor="middle" fontSize="14">Admin Block</text>
          </g>

          {/* Safe Evacuation Path */}
          {showPath && (
            <g>
              <polyline
                points={primaryRoute}
                fill="none"
                stroke="#22c55e"
                strokeWidth="6"
                strokeDasharray="10,5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="animate-pulse"
                markerEnd="url(#arrow)"
              />
            </g>
          )}

          {/* Hazard / Blocked Area Indicator */}
          <g transform="translate(50, 300)">
            <circle cx="0" cy="0" r="25" fill="#ef4444" opacity="0.2" className="animate-ping" />
            <circle cx="0" cy="0" r="15" fill="#ef4444" opacity="0.8" />
            <text x="0" y="4" fill="#ffffff" textAnchor="middle" fontSize="10" fontWeight="bold">X</text>
          </g>

          {/* Exit Points */}
          {exitPoints.map((exit) => (
            <g
              key={exit.id}
              transform={`translate(${exit.x}, ${exit.y})`}
              onClick={() => setActiveExit(exit)}
              className="cursor-pointer"
            >
              <circle
                cx="0"
                cy="0"
                r="18"
                fill={exit.status === 'CLEAR' ? '#22c55e' : '#ef4444'}
                stroke="#ffffff"
                strokeWidth="2"
              />
              <text x="0" y="4" fill="#ffffff" textAnchor="middle" fontSize="10" fontWeight="bold">
                EXIT
              </text>
            </g>
          ))}

          {/* User Location Marker */}
          <g transform={`translate(${userLocation.x}, ${userLocation.y})`}>
            <circle cx="0" cy="0" r="12" fill="#eab308" opacity="0.4" className="animate-ping" />
            <circle cx="0" cy="0" r="8" fill="#eab308" stroke="#ffffff" strokeWidth="2" />
            <text x="0" y="-15" fill="#eab308" textAnchor="middle" fontSize="11" fontWeight="bold">
              YOU
            </text>
          </g>
        </svg>
      </div>

      {/* Exit Info Modal / Tooltip */}
      {activeExit && (
        <div className="mt-4 p-3 bg-slate-800 rounded-lg border border-slate-700 flex justify-between items-center text-xs">
          <div>
            <span className="font-bold text-slate-200">{activeExit.name}</span>
            <span className={`ml-3 px-2 py-0.5 rounded font-bold ${activeExit.status === 'CLEAR' ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'}`}>
              {activeExit.status}
            </span>
          </div>
          <button onClick={() => setActiveExit(null)} className="text-slate-400 hover:text-white">Close</button>
        </div>
      )}
    </div>
  );
};

export default CampusMap;
