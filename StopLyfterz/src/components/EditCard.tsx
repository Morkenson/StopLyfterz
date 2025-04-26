import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "../supabaseClient";
import "./AddCard.css"; // Reuse the same styles as AddCard

const EditCard: React.FC = (): JSX.Element => {
  const navigate = useNavigate();
  const locationData = useLocation();
  const cardData = locationData.state as {
    id: string;
    Picture: string;
    Location: string;
    Company: string;
    Description: string;
  };

  const [locationField, setLocationField] = useState(cardData?.Location || "");
  const [companyField, setCompanyField] = useState(cardData?.Company || "");
  const [descriptionField, setDescriptionField] = useState(cardData?.Description || "");
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(cardData?.Picture || null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!file) {
      setPreviewUrl(cardData?.Picture || null);
      return;
    }
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [file, cardData]);

  const handleSubmit = async () => {
    setUploading(true);

    let publicUrl = cardData?.Picture;

    // If a new file is uploaded, upload it to Supabase storage
    if (file) {
      const filePath = `lifterphotos/${Date.now()}_${file.name}`;
      const { error: uploadError } = await supabase.storage.from("lifterphotos").upload(filePath, file);

      if (uploadError) {
        console.error("Upload error:", uploadError.message);
        alert("Image upload failed.");
        setUploading(false);
        return;
      }

      publicUrl = supabase.storage.from("lifterphotos").getPublicUrl(filePath).data.publicUrl;
    }

    // Update existing card
    const { error } = await supabase
      .from("LifterCard")
      .update({
        Picture: publicUrl,
        Location: locationField,
        Company: companyField,
        Description: descriptionField,
      })
      .eq("id", cardData.id);

    if (error) {
      alert("There was an error updating the card.");
    } else {
      alert("Card updated successfully!");
      navigate("/business");
    }

    setUploading(false);
  };

  return (
    <div className="add-card-container">
      <button className="close-btn" onClick={() => navigate("/business")}>
        {"\u2715"}
      </button>
      <h2 className="add-card-header">Edit Lifter Card</h2>

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

      <button onClick={handleSubmit} disabled={uploading} className="add-card-button">
        {uploading ? "Updating..." : "Update"}
      </button>
    </div>
  );
};

export default EditCard;