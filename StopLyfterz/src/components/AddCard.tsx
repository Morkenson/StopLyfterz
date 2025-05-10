import React from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import CardForm from "./CardForm";

const AddCard: React.FC = (): JSX.Element => {
  const navigate = useNavigate();

  const handleAddCard = async (data: {
    Picture: string;
    City: string;
    State: string;
    ZipCode: string;
    Company: string;
    Description: string;
  }) => {
    const { error } = await supabase.from("LifterCard").insert([data]);

    if (error) {
      alert("There was an error creating the card.");
    } else {
      alert("Card created successfully!");
      navigate("/business");
    }
  };

  return <CardForm onSubmit={handleAddCard} />;
};

export default AddCard;
