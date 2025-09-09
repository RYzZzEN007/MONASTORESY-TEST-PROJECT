import React, { useState } from "react";
import monasteries from "./data/monasteries.json";
import DemoScanner from "./components/DemoScanner";
import RealScanner from "./components/RealScanner";

export default function App() {
  const [qrCode, setQrCode] = useState(null);
  const [useCamera, setUseCamera] = useState(false);

  // find QR data in monastery JSON
  const qrData = monasteries
    .flatMap((m) => m.rooms)
    .flatMap((r) => r.qrs)
    .find((q) => q.id === qrCode);

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
      <h1>Monastery360</h1>
      <p>Scan QR codes to explore monasteries and hear folktales.</p>

      {/* toggle between camera + dropdown */}
      <button onClick={() => setUseCamera(!useCamera)}>
        {useCamera ? "Switch to Demo Mode" : "Switch to Camera Mode"}
      </button>

      <div style={{ marginTop: 20 }}>
        {useCamera ? (
          <RealScanner onDetected={(code) => setQrCode(code)} />
        ) : (
          <DemoScanner onSelect={(code) => setQrCode(code)} />
        )}
      </div>

      {/* show folktale */}
      {qrData ? (
        <div style={{ marginTop: 20, padding: 15, border: "1px solid #ccc" }}>
          <h3>{qrData.title}</h3>
          <p>{qrData.story}</p>
        </div>
      ) : (
        <p style={{ marginTop: 20 }}>No QR scanned yet.</p>
      )}
    </div>
  );
}
