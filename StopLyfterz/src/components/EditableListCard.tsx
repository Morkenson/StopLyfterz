import { supabase } from "../supabaseClient"; // Adjusted path to match expected location
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/styles/ListCard.css";

// Define TypeScript type for LifterCard
export interface EditableLifterCardData {
  id: string;
  Picture: string;
  City: string;
  State: string;
  ZipCode: string;
  Company: string;
  Description: string;
}

export function useEditableLifterCards(filter: string) {
  const [lifterCards, setLifterCards] = useState<EditableLifterCardData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        let { data, error } = await supabase.from("LifterCard").select("*");
        if (error) throw error;
        setLifterCards(data || []);
      } catch (error) {
        console.error("Error fetching lifter cards:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Filter lifter cards based on the search input
  const filteredCards = lifterCards.filter((card) =>
    card.City.toLowerCase().includes(filter.toLowerCase())
  );

  // Handle delete action
  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("LifterCard").delete().eq("id", id);
    if (error) {
      console.error("Error deleting card:", error);
      alert("Failed to delete the card.");
    } else {
      alert("Card deleted successfully!");
      setLifterCards((prevCards) => prevCards.filter((card) => card.id !== id));
    }
  };

  // Handle edit action
  const handleEdit = (card: EditableLifterCardData) => {
    navigate("/edit-card", { state: card }); // Pass card data to the EditCard page
  };

  // Return a pre-rendered component
  return {
    EditableLifterCardList: () => (
      <div className="page-background">
        <div className="container">
          {loading ? (
            <p className="text-center text-gray-600">Loading...</p>
          ) : filteredCards.length > 0 ? (
            <div className="list-card-container">
              {filteredCards.map((card) => (
                <div className="list-card" key={card.id}>
                  <div className="list-card-actions">
                    <button
                      className="list-card-edit"
                      onClick={() => handleEdit(card)}
                    >
                      Edit
                    </button>
                    <button
                      className="list-card-delete"
                      onClick={() => handleDelete(card.id)}
                    >
                      Delete
                    </button>
                  </div>
                  <img
                    src={card.Picture}
                    alt={`Image of ${card.Company}`}
                    className="list-card-image"
                  />
                  <div className="list-card-content">
                    <h3 className="list-card-title">{card.Company}</h3>
                    <p className="list-card-location">
                      <strong>Location:</strong> {card.City}, {card.State}
                    </p>
                    <p className="list-card-description">{card.Description}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600">No records found.</p>
          )}
        </div>
      </div>
    ),
  };
}
