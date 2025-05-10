import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import './VerifyAccount.css';

const VerifyAccount: React.FC = (): JSX.Element => {
  const navigate = useNavigate();
  const locationData = useLocation();
  const { locationSupervisor, supervisorEmail, businessAddress } = (locationData.state || {}) as {
    locationSupervisor: string;
    supervisorEmail: string;
    businessAddress: string;
    file: File;
  };

  const [locationSupervisorField, setlocationSupervisorField] = useState(locationSupervisor || '');
  const [supervisorEmailField, setsupervisorEmailField] = useState(supervisorEmail || '');
  const [businessAddressField, setbusinessAddressField] = useState(businessAddress || '')
  const [uploading, setUploading] = useState(false);

  
  const handleSubmit = async () => {
    setUploading(true);

    const { error } = await supabase.from('BusinessVerification').insert([
      {
        locationSupervisor: locationSupervisorField,
        supervisorEmail: supervisorEmailField,
        businessAddress: businessAddressField,
      },
    ]);

    if (error) {
      alert('There was an error submitting your request.');
    } else {
      alert('Verification request submitted successfully!');
      navigate('/business');
    }
    setUploading(false);
  };

    return (
    <div className="request-verification-page">
     <div className="request-verification-container">
            <button className="close-btn" onClick={() => navigate('/business')}>{"\u2715"}</button>
      <h2 className="request-verification-header">Verify your Business</h2>

      <label className="request-verification-label">Location Supervisor</label>
      <input
        type="text"
        value={locationSupervisorField}
        onChange={(e) => setlocationSupervisorField(e.target.value)}
        placeholder="e.g., Bill Gates"
        className="request-verification-input"
      />

      <label className="request-verification-label">Supervisor's Email Address</label>
      <input
        type="text"
        value={supervisorEmailField}
        onChange={(e) => setsupervisorEmailField(e.target.value)}
        placeholder="e.g., walmartOwner@gmail.com"
        className="request-verification-input"
      />

<label className="request-verification-label">Address of Business</label>
      <input
        type="text"
        value={businessAddressField}
        onChange={(e) => setbusinessAddressField(e.target.value)}
        placeholder="e.g., w9877 Somewhere Rd."
        className="request-verification-input"
      />

      <button
        onClick={handleSubmit}
        disabled={uploading}
        className="request-verification-button"
      >
        {uploading ? 'Submitting...' : 'Submit'}
      </button>
            </div>
    </div>
  );
};

export default VerifyAccount;
