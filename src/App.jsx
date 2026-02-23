import { useState } from 'react';
import './index.css';
// 1. We import BOTH arrays from your data file
import { incomingDocuments, projectRFIs } from './data.js'; 

function App() {
  const [activeTab, setActiveTab] = useState('transmittals'); 
  const [documents, setDocuments] = useState(incomingDocuments);
  // 2. We set up a new Whiteboard space specifically for RFIs
  const [rfis, setRfis] = useState(projectRFIs); 

  // Engine for Submittals
  function updateDocumentStatus(docId, newStatus) {
    const updatedDocs = documents.map(doc => {
      if (doc.id === docId) return { ...doc, status: newStatus };
      return doc;
    });
    setDocuments(updatedDocs);
  }

  // Engine for RFIs
  function closeRFI(rfiId) {
    const updatedRfis = rfis.map(rfi => {
      if (rfi.id === rfiId) return { ...rfi, status: 'Closed' };
      return rfi;
    });
    setRfis(updatedRfis);
  }

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#f3f4f6', fontFamily: 'system-ui' }}>
      
      {/* SIDEBAR NAVIGATION */}
      <div style={{ width: '250px', backgroundColor: '#1f2937', color: 'white', padding: '20px' }}>
        <h2 style={{ borderBottom: '1px solid #374151', paddingBottom: '15px', marginBottom: '20px' }}>DocuFlow eDMS</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <button onClick={() => setActiveTab('dashboard')} style={{ padding: '10px', textAlign: 'left', backgroundColor: activeTab === 'dashboard' ? '#3b82f6' : 'transparent', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>📊 Dashboard</button>
          <button onClick={() => setActiveTab('transmittals')} style={{ padding: '10px', textAlign: 'left', backgroundColor: activeTab === 'transmittals' ? '#3b82f6' : 'transparent', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>📤 Submittals</button>
          <button onClick={() => setActiveTab('rfis')} style={{ padding: '10px', textAlign: 'left', backgroundColor: activeTab === 'rfis' ? '#3b82f6' : 'transparent', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>❓ Digital RFIs</button>
          <button onClick={() => setActiveTab('issues')} style={{ padding: '10px', textAlign: 'left', backgroundColor: activeTab === 'issues' ? '#3b82f6' : 'transparent', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>⚠️ Site Issues</button>
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
        <h1 style={{ color: '#111827', marginBottom: '5px', textTransform: 'capitalize' }}>
          {activeTab === 'transmittals' ? 'Submittals' : activeTab === 'rfis' ? 'Digital RFIs' : activeTab} Overview
        </h1>
        
        {/* --- 🪄 CONDITIONAL RENDER: SUBMITTALS --- */}
        {activeTab === 'transmittals' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '30px' }}>
            {documents.map(doc => (
              <div key={doc.id} style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ margin: '0 0 5px 0', color: '#1f2937' }}>{doc.title}</h3>
                  <p style={{ margin: '0', color: '#6b7280', fontSize: '0.9rem' }}>ID: {doc.id} | Discipline: {doc.discipline}</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '10px' }}>
                  <span style={{ backgroundColor: doc.status === 'Approved' ? '#d1fae5' : doc.status === 'Rejected' ? '#fee2e2' : '#fef3c7', color: doc.status === 'Approved' ? '#065f46' : doc.status === 'Rejected' ? '#991b1b' : '#d97706', padding: '5px 12px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 'bold' }}>{doc.status}</span>
                  <div style={{ display: 'flex', gap: '5px' }}>
                    <button onClick={() => updateDocumentStatus(doc.id, 'Approved')} style={{ padding: '5px 10px', fontSize: '0.8rem', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Approve</button>
                    <button onClick={() => updateDocumentStatus(doc.id, 'Approved w/ Comments')} style={{ padding: '5px 10px', fontSize: '0.8rem', backgroundColor: '#f59e0b', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>w/ Comments</button>
                    <button onClick={() => updateDocumentStatus(doc.id, 'Rejected')} style={{ padding: '5px 10px', fontSize: '0.8rem', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Reject</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* --- 🪄 CONDITIONAL RENDER: RFIs --- */}
        {activeTab === 'rfis' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '30px' }}>
            {rfis.map(rfi => (
              <div key={rfi.id} style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', borderLeft: rfi.status === 'Open' ? '5px solid #ef4444' : '5px solid #10b981', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ margin: '0 0 5px 0', color: '#1f2937' }}>{rfi.subject}</h3>
                  <p style={{ margin: '0', color: '#6b7280', fontSize: '0.9rem' }}>ID: {rfi.id} | Contractor: {rfi.contractor} | Date: {rfi.dateSubmitted}</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '10px' }}>
                  <span style={{ backgroundColor: rfi.status === 'Open' ? '#fee2e2' : '#d1fae5', color: rfi.status === 'Open' ? '#991b1b' : '#065f46', padding: '5px 12px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 'bold' }}>{rfi.status}</span>
                  {rfi.status === 'Open' && (
                    <button onClick={() => closeRFI(rfi.id)} style={{ padding: '5px 15px', fontSize: '0.85rem', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Mark as Closed</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* --- 🪄 CONDITIONAL RENDER: DASHBOARD --- */}
        {activeTab === 'dashboard' && (
          <div style={{ marginTop: '30px', padding: '30px', backgroundColor: 'white', borderRadius: '8px', textAlign: 'center', color: '#6b7280' }}>
            <h2 style={{ color: '#1f2937' }}>Analytics Dashboard</h2>
            <p>We will build out the live charts and project metrics here in Step 4!</p>
          </div>
        )}

      </div>
    </div>
  );
}

export default App;