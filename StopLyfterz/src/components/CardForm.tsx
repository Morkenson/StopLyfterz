import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import "./AddCard.css";

interface CardFormProps {
  initialData?: {
    id?: string;
    Picture?: string;
    City?: string;
    State?: string;
    ZipCode?: string;
    Company?: string;
    Description?: string;
  };
  onSubmit: (data: {
    Picture: string;
    City: string;
    State: string;
    ZipCode: string;
    Company: string;
    Description: string;
  }) => Promise<void>;
  isEditing?: boolean;
}

const CardForm: React.FC<CardFormProps> = ({
  initialData,
  onSubmit,
  isEditing = false,
}) => {
  const [cityField, setCityField] = useState(initialData?.City || "");
  const [stateField, setStateField] = useState(initialData?.State || "");
  const [zipCodeField, setZipCodeField] = useState(initialData?.ZipCode || "");
  const [companyField, setCompanyField] = useState(initialData?.Company || "");
  const [descriptionField, setDescriptionField] = useState(
    initialData?.Description || ""
  );
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    initialData?.Picture || null
  );
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!file) {
      setPreviewUrl(initialData?.Picture || null);
      return;
    }
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [file, initialData]);

  const handleSubmit = async () => {
    setUploading(true);

    let publicUrl = initialData?.Picture;

    if (file) {
      const filePath = `lifterphotos/${Date.now()}_${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from("lifterphotos")
        .upload(filePath, file);

      if (uploadError) {
        console.error("Upload error:", uploadError.message);
        alert("Image upload failed.");
        setUploading(false);
        return;
      }

      publicUrl = supabase.storage.from("lifterphotos").getPublicUrl(filePath)
        .data.publicUrl;
    }

    await onSubmit({
      Picture: publicUrl || "",
      City: cityField,
      State: stateField,
      ZipCode: zipCodeField,
      Company: companyField,
      Description: descriptionField,
    });

    setUploading(false);
  };

  return (
    <div className="add-card-container">
      <h2 className="add-card-header">
        {isEditing ? "Edit Lifter Card" : "Create New Lifter Card"}
      </h2>

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

      <label className="add-card-label">City:</label>
      <input
        type="text"
        value={cityField}
        onChange={(e) => setCityField(e.target.value)}
        placeholder="e.g., Chicago"
        className="add-card-input"
      />

      <label className="add-card-label">State:</label>
      <input
        type="text"
        value={stateField}
        onChange={(e) => setStateField(e.target.value)}
        placeholder="e.g., IL"
        className="add-card-input"
      />

      <label className="add-card-label">ZipCode:</label>
      <input
        type="text"
        value={zipCodeField}
        onChange={(e) => setZipCodeField(e.target.value)}
        placeholder="e.g., 60127"
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
        {uploading
          ? isEditing
            ? "Updating..."
            : "Submitting..."
          : isEditing
          ? "Update"
          : "Submit"}
      </button>
    </div>
  );
};

export default CardForm;
