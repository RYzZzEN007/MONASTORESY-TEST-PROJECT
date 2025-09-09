import React from "react";
import { QrReader } from "react-qr-reader";

/*
Props:
 - onDetected(code)  => called when a QR code text is detected
*/
export default function RealScanner({ onDetected }) {
  return (
    <div style={{ maxWidth: 480 }}>
      <h3>Camera QR Scanner</h3>
      <div style={{ border: "1px solid #ddd", borderRadius: 8, overflow: "hidden" }}>
        <QrReader
          constraints={{ facingMode: "environment" }}
          containerStyle={{ width: "100%" }}
          videoStyle={{ width: "100%" }}
          onResult={(result, error) => {
            if (!!result) {
              // result may be an object in some versions
              const text = typeof result === "string" ? result : result?.text ?? result?.data ?? "";
              if (text) onDetected(text);
            }
          }}
        />
      </div>
      <small style={{ display: "block", marginTop: 8 }}>
        Allow camera permission. Use back camera on phones.
      </small>
    </div>
  );
}
