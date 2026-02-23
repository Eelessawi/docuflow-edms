import { useState } from 'react';
import './index.css';
import { incomingDocuments, projectRFIs, siteIssues } from './data.js'; 

function App() {
  const [activeTab, setActiveTab] = useState('dashboard'); // Let's make Dashboard the default screen!
  const [documents, setDocuments] = useState(incomingDocuments);
  const [rfis, setRfis] = useState(projectRFIs); 
  const [issues, setIssues] = useState(siteIssues); 
  const [newRfiSubject, setNewRfiSubject] = useState(' ');

  // 🧮 THE CALCULATOR: Automatically counting our live metrics
  const pendingDocsCount = documents.filter(doc => doc.status === 'Pending Routing').length;
  const openRfiCount = rfis.filter(rfi => rfi.status === 'Open').length;
  const openIssuesCount = issues.filter(issue => issue.status === 'Open').length;
  const criticalIssuesCount = issues.filter(issue => issue.status === 'Open' && issue.severity === 'Critical').length;

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

  // Engine for Issues
  function resolveIssue(issueId) {
    const updatedIssues = issues.map(issue => {
      if (issue.id === issueId) return { ...issue, status: 'Resolved' };
      return issue;
    });
    setIssues(updatedIssues);
  }

  // Engine for Creating a New RFI
  function submitNewRfi() {
    // 1. If the scratchpad is empty, don't do anything!
    if (newRfiSubject.trim() === '') return;

    // 2. Create the new RFI Object (The new Manila Folder)
    const newRfiObject = {
      id: `RFI-09${rfis.length + 1}`, // Generate a fake ID (e.g., RFI-094)
      subject: newRfiSubject,         // Grab the exact text from the Scratchpad!
      contractor: "Site Inspector",
      discipline: "General",
      status: "Open",
      dateSubmitted: "2026-02-23"
    };

    // 3. Put the new folder into the main filing cabinet
    // The [...rfis] part means "keep all the old RFIs, and add this new one to the end"
    setRfis([...rfis, newRfiObject]);

    // 4. Erase the scratchpad so the input box goes blank again
    setNewRfiSubject('');
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
          {activeTab === 'transmittals' ? 'Submittals' : activeTab === 'rfis' ? 'Digital RFIs' : activeTab === 'issues' ? 'Site Issues' : 'Executive Dashboard'}
        </h1>
        
        {/* --- 🪄 CONDITIONAL RENDER: DASHBOARD --- */}
        {activeTab === 'dashboard' && (
          <div style={{ marginTop: '30px' }}>
            <p style={{ color: '#6b7280', marginBottom: '20px' }}>Real-time project metrics for KingsRE Management.</p>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
              
              {/* Stat Card 1: Submittals */}
              <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', borderTop: '4px solid #3b82f6' }}>
                <h3 style={{ color: '#6b7280', margin: '0 0 10px 0', fontSize: '1rem' }}>Pending Submittals</h3>
                <p style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '0', color: '#1f2937' }}>{pendingDocsCount}</p>
              </div>

              {/* Stat Card 2: RFIs */}
              <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', borderTop: '4px solid #f59e0b' }}>
                <h3 style={{ color: '#6b7280', margin: '0 0 10px 0', fontSize: '1rem' }}>Open RFIs</h3>
                <p style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '0', color: '#1f2937' }}>{openRfiCount}</p>
              </div>

              {/* Stat Card 3: Issues */}
              <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', borderTop: criticalIssuesCount > 0 ? '4px solid #ef4444' : '4px solid #10b981' }}>
                <h3 style={{ color: '#6b7280', margin: '0 0 10px 0', fontSize: '1rem' }}>Open Site Issues</h3>
                <p style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '0', color: '#1f2937' }}>{openIssuesCount}</p>
                {criticalIssuesCount > 0 && (
                  <p style={{ color: '#ef4444', margin: '10px 0 0 0', fontSize: '0.85rem', fontWeight: 'bold' }}>⚠️ {criticalIssuesCount} Critical Defect(s)</p>
                )}
              </div>

            </div>
          </div>
        )}

        {/* --- CONDITIONAL RENDER: SUBMITTALS --- */}
        {activeTab === 'transmittals' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '30px' }}>
            {documents.map(doc => (
              <div key={doc.id} style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ margin: '0 0 5px 0', color: '#1f2937' }}>{doc.title}</h3>
                  <p style={{ margin: '0', color: '#6b7280', fontSize: '0.9rem' }}>ID: {doc.id} | Discipline: {doc.discipline}</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '10px' }}>
                  <span style={{ backgroundColor: doc.status.includes('Approved') ? '#d1fae5' : doc.status === 'Rejected' ? '#fee2e2' : '#fef3c7', color: doc.status.includes('Approved') ? '#065f46' : doc.status === 'Rejected' ? '#991b1b' : '#d97706', padding: '5px 12px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 'bold' }}>{doc.status}</span>
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

        {/* --- CONDITIONAL RENDER: RFIs --- */}
        {activeTab === 'rfis' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '30px' }}>
            {/* THE NEW RFI FORM AREA */}
          <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', marginBottom: '20px', border: '1px solid #e5e7eb' }}>
            <h3 style={{ marginTop: '0' }}>Create New RFI</h3>
            
            <input 
              type="text" 
              placeholder="What is the issue on site?" 
              value={newRfiSubject} 
              onChange={(event) => setNewRfiSubject(event.target.value)} 
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #d1d5db', marginBottom: '10px' }}
            />
            
            {/* This paragraph is just to prove our Scratchpad is working! */}
 {/* THE NEW RFI FORM AREA */}
          <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', marginBottom: '20px', border: '1px solid #e5e7eb' }}>
            <h3 style={{ marginTop: '0' }}>Create New RFI</h3>
            
            <input 
              type="text" 
              placeholder="What is the issue on site?" 
              value={newRfiSubject} 
              onChange={(event) => setNewRfiSubject(event.target.value)} 
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #d1d5db', marginBottom: '10px' }}
            />
            
            {/* THE NEW BUTTON THAT REPLACED THE PARAGRAPH 👇 */}
            <button 
              onClick={submitNewRfi} 
              style={{ padding: '10px 15px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
              Submit New RFI
            </button>

          </div>
          </div>
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

        {/* --- CONDITIONAL RENDER: SITE ISSUES --- */}
        {activeTab === 'issues' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '30px' }}>
            {issues.map(issue => (
              <div key={issue.id} style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', borderLeft: issue.severity === 'Critical' ? '5px solid #7f1d1d' : issue.severity === 'High' ? '5px solid #ef4444' : '5px solid #f59e0b', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ margin: '0 0 5px 0', color: '#1f2937' }}>{issue.title}</h3>
                  <p style={{ margin: '0', color: '#6b7280', fontSize: '0.9rem' }}>
                    ID: {issue.id} | Type: <strong>{issue.type}</strong> | Assigned: {issue.assignedTo}
                  </p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '10px' }}>
                  <span style={{ backgroundColor: issue.status === 'Open' ? '#fee2e2' : '#d1fae5', color: issue.status === 'Open' ? '#991b1b' : '#065f46', padding: '5px 12px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 'bold' }}>{issue.status}</span>
                  {issue.status === 'Open' && (
                    <button onClick={() => resolveIssue(issue.id)} style={{ padding: '5px 15px', fontSize: '0.85rem', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Mark Resolved</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

export default App;