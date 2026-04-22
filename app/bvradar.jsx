"use client";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Bvradar() {
  const [section, setSection] = useState("dashboard");
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  async function fetchEvents() {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .eq("active", true);

    if (error) {
      console.error("Error cargando eventos:", error);
    } else {
      setEvents(data);
    }
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0d1120",
      color: "#fff",
      padding: 20
    }}>
      <h1>🚀 Betvora Admin Panel</h1>

      <div style={{ marginTop: 20 }}>
        <button onClick={() => setSection("dashboard")}>Dashboard</button>
        <button onClick={() => setSection("eventos")}>Eventos</button>
        <button onClick={() => setSection("usuarios")}>Usuarios</button>
      </div>

      <div style={{ marginTop: 30 }}>

        {section === "dashboard" && (
          <h2>📊 Dashboard funcionando</h2>
        )}

        {section === "eventos" && (
          <div>
            <h2>⚽ Eventos</h2>

            {events.map((e) => (
              <div key={e.id} style={{
                border: "1px solid #333",
                padding: 10,
                marginBottom: 10
              }}>
                <p><b>{e.home} vs {e.away}</b></p>
                <p>{e.league} - {e.sport}</p>
                <p>Hora: {e.event_time}</p>

                <div style={{ display: "flex", gap: 10 }}>
                  <span>🏠 {e.home_odd}</span>
                  <span>🤝 {e.draw_odd}</span>
                  <span>✈️ {e.away_odd}</span>
                </div>

                {e.live && <span style={{ color: "red" }}>🔴 EN VIVO</span>}
              </div>
            ))}

          </div>
        )}

        {section === "usuarios" && (
          <UsersPanel />
        )}

      </div>
    </div>
  );
}

function UsersPanel() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    const { data, error } = await supabase
      .from("users")
      .select("*");

    if (!error) setUsers(data);
  }

  return (
    <div>
      <h2>👥 Usuarios</h2>

      {users.map((u) => (
        <div key={u.id}>
          {u.username} - 💰 {u.credits} - ⭐ lvl {u.level}
        </div>
      ))}
    </div>
  );
}