import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import './AddCard.css';

const AddCard: React.FC = (): JSX.Element => {
  const navigate = useNavigate();
  const locationData = useLocation();
  const { company, location: loc, description, file: initialFile } = (locationData.state || {}) as {
    company: string;
    location: string;
    description: string;
    file: File;
  };

  const [locationField, setLocationField] = useState(loc || '');
  const [companyField, setCompanyField] = useState(company || '');
  const [descriptionField, setDescriptionField] = useState(description || '');
  const [file, setFile] = useState<File | null>(initialFile || null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!file) {
      setPreviewUrl(null);
      return;
    }
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  const handleSubmit = async () => {
    if (!file) {
      alert('Please select a photo.');
      return;
    }
    setUploading(true);

    const filePath = `lifterphotos/${Date.now()}_${file.name}`;
    const { error: uploadError } = await supabase.storage.from('lifterphotos').upload(filePath, file);

    if (uploadError) {
      console.error('Upload error:', uploadError.message);
      alert('Image upload failed.');
      setUploading(false);
      return;
    }

    const publicUrl = supabase.storage.from('lifterphotos').getPublicUrl(filePath).data.publicUrl;

    const { error } = await supabase.from('LifterCard').insert([
      {
        Picture: publicUrl,
        Location: locationField,
        Company: companyField,
        Description: descriptionField,
      },
    ]);

    if (error) {
      alert('There was an error creating the card.');
    } else {
      alert('Card created successfully!');
      navigate('/business');
    }
    setUploading(false);
  };

    return (
    
     <div className="add-card-container">
            <button className="close-btn" onClick={() => navigate('/business')}>{"\u2715"}</button>
      <h2 className="add-card-header">Create New Lifter Card</h2>

      {previewUrl && (
        <div className="add-card-preview">
          <img src={previewUrl} alt="Preview" />
        </div>
      )}

      <label className="add-card-label">Photo:</label>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="add-card-input"
      />

      <label className="add-card-label">Location:</label>
      <input
        type="text"
        value={locationField}
        onChange={(e) => setLocationField(e.target.value)}
        placeholder="e.g., Chicago, IL"
        className="add-card-input"
      />

      <label className="add-card-label">Company:</label>
      <input
        type="text"
        value={companyField}
        onChange={(e) => setCompanyField(e.target.value)}
        placeholder="e.g., Walmart"
        className="add-card-input"
      />

      <label className="add-card-label">Description:</label>
      <textarea
        value={descriptionField}
        onChange={(e) => setDescriptionField(e.target.value)}
        placeholder="What happened?"
        className="add-card-textarea"
      />

      <button
        onClick={handleSubmit}
        disabled={uploading}
        className="add-card-button"
      >
        {uploading ? 'Submitting...' : 'Submit'}
      </button>
            </div>
   
  );
};

export default AddCard;