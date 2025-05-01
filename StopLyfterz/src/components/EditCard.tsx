import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "../supabaseClient";
import CardForm from "./CardForm";

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

  const handleEditCard = async (data: {
    Picture: string;
    Location: string;
    Company: string;
    Description: string;
  }) => {
    const { error } = await supabase.from("LifterCard").update(data).eq("id", cardData.id);

    if (error) {
      alert("There was an error updating the card.");
    } else {
      alert("Card updated successfully!");
      navigate("/business");
    }
  };

  return <CardForm initialData={cardData} onSubmit={handleEditCard} isEditing />;
};

export default EditCard;