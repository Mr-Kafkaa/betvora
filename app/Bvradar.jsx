"use client";
import { useState } from "react";

export default function FinnPlay() {
  const [section, setSection] = useState("dashboard");

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0d1120",
      color: "#fff",
      fontFamily: "sans-serif",
      padding: 20
    }}>
      <h1 style={{ fontSize: 28, fontWeight: "bold" }}>
        🚀 Betvora Admin Panel
      </h1>

      <div style={{ marginTop: 20 }}>
        <button onClick={() => setSection("dashboard")}>Dashboard</button>
        <button onClick={() => setSection("eventos")}>Eventos</button>
        <button onClick={() => setSection("usuarios")}>Usuarios</button>
      </div>

      <div style={{ marginTop: 30 }}>
        {section === "dashboard" && <h2>📊 Dashboard funcionando</h2>}
        {section === "eventos" && <h2>⚽ Eventos funcionando</h2>}
        {section === "usuarios" && <h2>👥 Usuarios funcionando</h2>}
      </div>
    </div>
  );
}