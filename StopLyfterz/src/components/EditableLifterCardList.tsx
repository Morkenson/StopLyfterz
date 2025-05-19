// src/pages/EditableLifterCardList.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";           // adjust path if needed
import "../assets/styles/ListCard.css";                 // keep or remove

/* ---------- types ---------- */
export interface LifterCard {
  id: string;
  Picture: string;
  City: string;
  State: string;
  ZipCode: string;
  Company: string;
  Description: string;
}

export default function EditableLifterCardList() {
  const [cards, setCards] = useState<LifterCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  /* fetch once */
  useEffect(() => {
    (async () => {
      const { data, error } = await supabase.from("LifterCard").select("*");
      if (error) console.error(error);
      else setCards(data ?? []);
      setLoading(false);
    })();
  }, []);

  const filtered = cards.filter(c =>
    c.City.toLowerCase().includes(search.toLowerCase()),
  );

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this card?")) return;
    const { error } = await supabase.from("LifterCard").delete().eq("id", id);
    if (error) return alert("Delete failed");
    setCards(prev => prev.filter(c => c.id !== id));
  };

  const handleEdit = (card: LifterCard) =>
    navigate("/edit-card", { state: card });

  /* ─── inline style helpers ─── */
  const pageStyle: React.CSSProperties = {
    marginTop: "calc(var(--header-outer-height) + 8px)",  // 110 px + 8 px gap
    padding: "0 24px 24px",
    boxSizing: "border-box",
    width: "100%",               // <- drops content below header
  };

  const searchBarStyle: React.CSSProperties = {
    width: "100%",
    maxWidth: 360,
    height: 38,
    padding: "0 12px",
    border: "1px solid #ccc",
    borderRadius: 4,
    margin: "0 auto 24px",       // centred, gap below
    display: "block",
  };

  const gridStyle: React.CSSProperties = {
    width: "100%",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: 32,
  };

  const cardStyle: React.CSSProperties = {
    background: "#d8d8d8",
    borderRadius: 6,
    boxShadow: "0 2px 4px rgb(0 0 0 / 40%)",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
  };

  return (
    <section style={pageStyle}>
      <input
        style={searchBarStyle}
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Filter by city…"
      />

      {loading ? (
        <p style={{ textAlign: "center" }}>Loading…</p>
      ) : filtered.length === 0 ? (
        <p style={{ textAlign: "center" }}>No records found.</p>
      ) : (
        <div style={gridStyle}>
          {filtered.map(card => (
            <article key={card.id} style={cardStyle}>
              <div style={{ padding: "8px 8px 0", textAlign: "right" }}>
                <button onClick={() => handleEdit(card)}>Edit</button>{" "}
                <button onClick={() => handleDelete(card.id)}>Delete</button>
              </div>

              <img
                src={card.Picture}
                alt={`Image of ${card.Company}`}
                style={{ width: "100%", height: "300px", objectFit: "cover" }}
              />

              <div style={{ padding: 16 }}>
                <h3>{card.Company}</h3>
                <p>
                  <strong>Location:</strong> {card.City}, {card.State}
                </p>
                <p>{card.Description}</p>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
