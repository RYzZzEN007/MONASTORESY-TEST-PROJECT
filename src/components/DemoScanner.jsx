import React, { useState } from "react";
import data from "../data/monasteries.json";

export default function DemoScanner({ onDetected }) {
  const [selected, setSelected] = useState("");

  const handle = (ev) => {
    const code = ev.target.value;
    setSelected(code);
    onDetected && onDetected(code);
  };

  return (
    <div style={{ maxWidth: 480 }}>
      <h3>Demo QR Selector (no camera)</h3>
      <select value={selected} onChange={handle} style={{ width: "100%", padding: 8 }}>
        <option value="">-- Choose a sample QR --</option>
        {data.map((mon) =>
          mon.rooms.map((room) =>
            room.qrs.map((qr) => (
              <option key={qr.code} value={qr.code}>
                {mon.name} — {room.name} — {qr.title}
              </option>
            ))
          )
        )}
      </select>
      <small style={{ display: "block", marginTop: 8 }}>
        Use this when camera access is not available.
      </small>
    </div>
  );
}
