import React from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import CardForm from "./CardForm";
import {getVerified} from '../dbController';

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

    const verified = await getVerified(payload.Email ?? null);

    if (verified) {
      const { error } = await supabase.from("LifterCard").insert([payload]); 

      if (!error) {
      alert("Card created successfully!");
      navigate("/business");
      }
    }
    else {
      alert("Must be Verified to create a card");
    }   
  };

  return <CardForm onSubmit={handleAddCard} />;
};

export default AddCard;
