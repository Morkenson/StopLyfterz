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
            filteredCards.map((lifter) => (
              <div className="box" key={lifter.id}>
                <div className="box-content">
                  <img src={lifter.Picture} alt={`Image of ${lifter.Picture}`} />
                </div>
                <div>
                  <strong className="description">Location: {lifter.Location}</strong>
                  <p className="description">Company: {lifter.Company}</p>
                  <p className="lyfter-description"> Description: {lifter.Description}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600">No records found.</p>
          )}
        </div>
      </div>
    ),
  };
}
