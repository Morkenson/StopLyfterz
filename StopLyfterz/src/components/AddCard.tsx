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

    const {
      data: { user },
      error: authErr,
    } = await supabase.auth.getUser();

    if (authErr || !user) {
      alert("You must be logged in to create a card.");
      return;
    }

    const payload = {
      ...data,
      Email: user.email,          // <-- adjust column name if different
    };

    const { error } = await supabase.from("LifterCard").insert([payload]);

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
