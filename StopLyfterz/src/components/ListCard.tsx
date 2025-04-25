//import { VStack } from "@chakra-ui/react";
//import AddCard from "./AddCard";
//import DeleteCard from "./DeleteCard";
//import EditCard from "./EditCard";
import { supabase } from "../supabaseClient"; // Adjusted path to match expected location
import { useEffect, useState } from "react";
import "../assets/styles/Dashboard.css";
import "../assets/styles/ListCard.css";

// Define TypeScript type for LifterCard
export interface LifterCardData {
  id: string;
  Picture: string;
  Location: string;
  Company: string;
  Description: string;
}

// Custom hook that returns a pre-rendered component
export function useLifterCards(filter: string) {
  const [lifterCards, setLifterCards] = useState<LifterCardData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

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
    card.Location.toLowerCase().includes(filter.toLowerCase())
  );

  // Return a pre-rendered component
  return {
    LifterCardList: () => (
      <div className="page-background">
        <div className="container">
          {loading ? (
            <p className="text-center text-gray-600">Loading...</p>
          ) : filteredCards.length > 0 ? (
            <div className="list-card-container">
              {filteredCards.map((card) => (
                <div className="list-card" key={card.id}>
                  <img src={card.Picture} alt={`Image of ${card.Company}`} className="list-card-image" />
                  <div className="list-card-content">
                    <h3 className="list-card-title">{card.Company}</h3>
                    <p className="list-card-location"><strong>Location:</strong> {card.Location}</p>
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
