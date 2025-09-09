import React from "react";

export default function AudioGuide({ audio, text, lang = "en-US" }) {
  const play = () => {
    if (audio) {
      const a = new Audio(audio);
      a.play();
    } else if ("speechSynthesis" in window) {
      const utter = new SpeechSynthesisUtterance(text || "No narration available");
      utter.lang = lang;
      window.speechSynthesis.speak(utter);
    } else {
      alert("Audio not available and browser has no TTS.");
    }
  };

  return (
    <div style={{ marginTop: 12 }}>
      <h3>Audio Guide</h3>
      <button onClick={play}>Play narration</button>
      {audio && (
        <div style={{ marginTop: 8 }}>
          <audio controls src={audio}>
            Your browser does not support the audio element.
          </audio>
        </div>
      )}
    </div>
  );
}
