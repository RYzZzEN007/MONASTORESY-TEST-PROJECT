import { QRCode } from 'qrcode.react';

import React, { useState } from "react";
import Navbar from "./components/Navbar";
import MapView from "./components/MapView";
import SearchBar from "./components/SearchBar";
import VirtualTour from "./components/VirtualTour";
import AudioGuide from "./components/AudioGuide";
import monasteries from "./data/monasteries.json";
import { useTranslation } from "react-i18next";

export default function App() {
  const { t } = useTranslation();
  const [selectedMonastery, setSelectedMonastery] = useState(null);

  return (
    <div>
      <Navbar />
      <div className="container">
        <h1>{t("welcome")}</h1>

        <SearchBar data={monasteries} onSelect={setSelectedMonastery} />

        <MapView monasteries={monasteries} onSelect={setSelectedMonastery} />

        {selectedMonastery && (
          <div className="card">
            <h2>{selectedMonastery.name}</h2>
            <p>{selectedMonastery.description}</p>
            <VirtualTour image="/360.jpg" />
            <AudioGuide
              audio={selectedMonastery.audio}
              text={selectedMonastery.description}
            />
          </div>
        )}
      </div>
    </div>
  );
}
