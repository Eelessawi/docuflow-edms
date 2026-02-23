import { useState } from 'react';
import './index.css';
import { incomingDocuments } from './data.js';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [documents, setDocuments] = useState(incomingDocuments);

  // ⚙️ THE ENGINE: This handles the ACC Submittal Workflow
  function updateDocumentStatus(docId, newStatus) {
    // 1. Loop through all documents on the whiteboard
    const updatedDocs = documents.map(doc => {
      // 2. If this is the exact document the engineer clicked...
      if (doc.id === docId) {
        return { ...doc, status: newStatus }; // ...update its status!
      }
      return doc; // Otherwise, leave it alone
    });
    
    // 3. Hand the updated list back to the React Whiteboard to redraw the screen
    setDocuments(updatedDocs);
  }

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#f3f4f6', fontFamily: 'system-ui' }}>
      
      {/* SIDEBAR NAVIGATION */}
      <div style={{ width: '250px', backgroundColor: '#1f2937', color: 'white', padding: '20px' }}>
        <h2 style={{ borderBottom: '1px solid #374151', paddingBottom: '15px', marginBottom: '20px' }}>
          DocuFlow eDMS
        </h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <button onClick={() => setActiveTab('dashboard')} style={{ padding: '10px', textAlign: 'left', backgroundColor: activeTab === 'dashboard' ? '#3b82f6' : 'transparent', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>📊 Dashboard</button>
          <button onClick={() => setActiveTab('transmittals')} style={{ padding: '10px', textAlign: 'left', backgroundColor: activeTab === 'transmittals' ? '#3b82f6' : 'transparent', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>📤 Submittals</button>
          <button onClick={() => setActiveTab('rfis')} style={{ padding: '10px', textAlign: 'left', backgroundColor: activeTab === 'rfis' ? '#3b82f6' : 'transparent', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>❓ Digital RFIs</button>
          <button onClick={() => setActiveTab('issues')} style={{ padding: '10px', textAlign: 'left', backgroundColor: activeTab === 'issues' ? '#3b82f6' : 'transparent', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>⚠️ Site Issues</button>
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
        <h1 style={{ color: '#111827', marginBottom: '5px', textTransform: 'capitalize' }}>{activeTab} Overview</h1>
        <p style={{ color: '#6b7280', marginBottom: '30px' }}>Manage project documents, routing, and engineer approvals.</p>

        {/* ACC SUBMITTAL WORKFLOW LIST */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {documents.map(doc => (
            <div key={doc.id} style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              
              <div>
                <h3 style={{ margin: '0 0 5px 0', color: '#1f2937' }}>{doc.title}</h3>
                <p style={{ margin: '0', color: '#6b7280', fontSize: '0.9rem' }}>ID: {doc.id} | Discipline: {doc.discipline}</p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '10px' }}>
                {/* The Status Badge dynamically changes color based on its text! */}
                <span style={{ 
                  backgroundColor: doc.status === 'Approved' ? '#d1fae5' : doc.status === 'Rejected' ? '#fee2e2' : '#fef3c7', 
                  color: doc.status === 'Approved' ? '#065f46' : doc.status === 'Rejected' ? '#991b1b' : '#d97706', 
                  padding: '5px 12px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 'bold' 
                }}>
                  {doc.status}
                </span>

                {/* 🔌 THE WIRING: Buttons trigger the function and pass the specific ID and new status */}
                <div style={{ display: 'flex', gap: '5px' }}>
                  <button onClick={() => updateDocumentStatus(doc.id, 'Approved')} style={{ padding: '5px 10px', fontSize: '0.8rem', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Approve</button>
                  <button onClick={() => updateDocumentStatus(doc.id, 'Approved w/ Comments')} style={{ padding: '5px 10px', fontSize: '0.8rem', backgroundColor: '#f59e0b', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>w/ Comments</button>
                  <button onClick={() => updateDocumentStatus(doc.id, 'Rejected')} style={{ padding: '5px 10px', fontSize: '0.8rem', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Reject</button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default App;