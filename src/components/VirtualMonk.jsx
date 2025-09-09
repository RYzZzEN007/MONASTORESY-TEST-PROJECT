import React from "react";

export default function VirtualMonk({ text, onPlayAudio, avatar="/monk.png" }) {
  const speak = () => {
    if (onPlayAudio) onPlayAudio();
    // Also try browser TTS as fallback
    if ("speechSynthesis" in window && text) {
      const u = new SpeechSynthesisUtterance(text);
      u.lang = "en-US";
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(u);
    }
  };

  return (
    <div style={{ display: "flex", gap: 12, alignItems: "flex-start", marginTop: 12 }}>
      <img src={avatar} alt="monk" style={{ width: 80, height: 80, borderRadius: 8, objectFit: "cover" }} />
      <div style={{ background: "#fff9e6", padding: 12, borderRadius: 8, boxShadow: "0 1px 6px rgba(0,0,0,0.08)" }}>
        <div style={{ fontWeight: 700, marginBottom: 6 }}>Virtual Monk</div>
        <div style={{ marginBottom: 8 }}>{text}</div>
        <button onClick={speak} style={{ padding: "6px 10px" }}>Play / Speak</button>
      </div>
    </div>
  );
}
