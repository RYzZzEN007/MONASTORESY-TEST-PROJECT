import React, { useState } from "react";
import DemoScanner from "./components/DemoScanner";
import RealScanner from "./components/RealScanner";
import VirtualMonk from "./components/VirtualMonk";
import data from "./data/monasteries.json";

export default function App() {
  const [mode, setMode] = useState("demo"); // "demo" or "camera"
  const [lastCode, setLastCode] = useState("");
  const [story, setStory] = useState(null);

  // find folktale by code
  const findByCode = (code) => {
    if (!code) {
      setLastCode("");
      setStory(null);
      return;
    }
    setLastCode(code);
    let found = null;
    data.forEach((mon) =>
      mon.rooms.forEach((room) =>
        room.qrs.forEach((qr) => {
          if (qr.code === code) found = { monastery: mon, room, qr };
        })
      )
    );
    if (found) {
      setStory({
        title: found.qr.title,
        text: found.qr.folktale,
        monastery: found.monastery.name,
        room: found.room.name
      });
    } else {
      setStory({ title: "Unknown QR", text: `No folktale found for code "${code}"`});
    }
  };

  return (
    <div style={{ padding: 20, fontFamily: "system-ui" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>Monastery360 — QR Demo</h1>
        <div>
          <button onClick={() => setMode("demo")} style={{ marginRight: 8 }}>Demo</button>
          <button onClick={() => setMode("camera")}>Camera</button>
        </div>
      </header>

      <section style={{ marginTop: 18, display: "flex", gap: 24 }}>
        <div style={{ flex: 1 }}>
          {mode === "demo" ? (
            <DemoScanner onDetected={(code) => findByCode(code)} />
          ) : (
            <RealScanner onDetected={(code) => findByCode(code)} />
          )}

          <div style={{ marginTop: 16 }}>
            <h4>Last scanned code:</h4>
            <div style={{ background: "#fff", padding: 12, borderRadius: 8, border: "1px solid #eee" }}>
              {lastCode || <em>none</em>}
            </div>
          </div>
        </div>

        <aside style={{ width: 420 }}>
          <h3>Folktale / Info</h3>
          <div style={{ background: "#fff", padding: 12, borderRadius: 8, minHeight: 120 }}>
            {story ? (
              <>
                <h4 style={{ margin: "0 0 6px 0" }}>{story.title}</h4>
                <div style={{ color: "#666" }}>{story.monastery && <div><strong>{story.monastery}</strong> — {story.room}</div>}</div>
                <p style={{ marginTop: 8 }}>{story.text}</p>
                <VirtualMonk text={story.text} />
              </>
            ) : (
              <div style={{ color: "#666" }}>Scan a QR code (or use Demo mode) to see the folktale here.</div>
            )}
          </div>

          <div style={{ marginTop: 12 }}>
            <h4>Sample QR images</h4>
            <p>Right-click → open in new tab to scan from another device / print / show on screen:</p>
            <ul>
              <li><a href="https://api.qrserver.com/v1/create-qr-code/?data=RUMTEK-LIB-QR1&size=300x300" target="_blank" rel="noreferrer">RUMTEK-LIB-QR1</a></li>
              <li><a href="https://api.qrserver.com/v1/create-qr-code/?data=RUMTEK-LIB-QR2&size=300x300" target="_blank" rel="noreferrer">RUMTEK-LIB-QR2</a></li>
              <li><a href="https://api.qrserver.com/v1/create-qr-code/?data=RUMTEK-HALL-QR1&size=300x300" target="_blank" rel="noreferrer">RUMTEK-HALL-QR1</a></li>
              <li><a href="https://api.qrserver.com/v1/create-qr-code/?data=PEM-HALL-QR1&size=300x300" target="_blank" rel="noreferrer">PEM-HALL-QR1</a></li>
            </ul>
          </div>
        </aside>
      </section>
    </div>
  );
}
