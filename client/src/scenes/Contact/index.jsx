import React, { useState, useRef } from "react";
import "./Contact.css"; // ✅ Import normal CSS

export default function Contact({
  emergencyNumbers = {
    police: "+112",
    ambulance: "+112",
    fire: "+112",
  },
  sosEndpoint = "/api/sos",
}) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [lastLocation, setLastLocation] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const sosButtonRef = useRef(null);

  const callNumber = (num) => {
    window.location.href = `tel:${num}`;
  };

  const getCurrentPosition = (options = { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }) =>
    new Promise((resolve, reject) => {
      if (!("geolocation" in navigator)) {
        reject(new Error("Geolocation not supported."));
        return;
      }
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });

  const sendLocationToAuthorities = async (position) => {
    setLoading(true);
    setMessage(null);
    try {
      const payload = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        accuracy: position.coords.accuracy,
        timestamp: position.timestamp,
        userAgent: navigator.userAgent,
      };

      const res = await fetch(sosEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Server error");

      setLastLocation(payload);
      setMessage("✅ SOS sent — authorities notified.");
    } catch {
      setMessage("❌ Failed to send SOS. Please try calling emergency numbers.");
    } finally {
      setLoading(false);
      setModalOpen(false);
    }
  };

  const handleSOS = async () => {
    setModalOpen(true);
  };

  const confirmSOS = async () => {
    setModalOpen(false);
    setLoading(true);
    setMessage(null);
    try {
      const pos = await getCurrentPosition();
      await sendLocationToAuthorities(pos);
    } catch {
      setMessage("Unable to get location. Enable GPS and try again.");
      setLoading(false);
    }
  };

  const copyLocationToClipboard = async () => {
    try {
      const pos = await getCurrentPosition();
      const url = `https://maps.google.com/?q=${pos.coords.latitude},${pos.coords.longitude}`;
      await navigator.clipboard.writeText(url);
      setMessage("📍 Location copied to clipboard.");
      setLastLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude, accuracy: pos.coords.accuracy });
    } catch {
      setMessage("Could not copy location — enable location and clipboard access.");
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-container">
        <header className="contact-header">
          <h1>Emergency Contacts & SOS</h1>
          <p>Quick access to police, ambulance & location sharing</p>
        </header>

        <section className="contact-section">
          <div className="contact-grid">
            {/* Quick Calls */}
            <div className="quick-calls">
              <h2>Quick Actions</h2>
              <div className="button-grid">
                <button onClick={() => callNumber(emergencyNumbers.police)}>
                  <span className="small-text">Police</span>
                  <span className="big-text">{emergencyNumbers.police}</span>
                </button>
                <button onClick={() => callNumber(emergencyNumbers.ambulance)}>
                  <span className="small-text">Ambulance</span>
                  <span className="big-text">{emergencyNumbers.ambulance}</span>
                </button>
                <button onClick={() => callNumber(emergencyNumbers.fire)}>
                  <span className="small-text">Fire Dept</span>
                  <span className="big-text">{emergencyNumbers.fire}</span>
                </button>
              </div>

              <div className="location-buttons">
                <button onClick={copyLocationToClipboard}>Copy My Location</button>
                <button
                  onClick={async () => {
                    try {
                      const pos = await getCurrentPosition();
                      const url = `https://maps.google.com/?q=${pos.coords.latitude},${pos.coords.longitude}`;
                      await navigator.clipboard.writeText(url);
                      setMessage("Location copied — share it with contacts.");
                    } catch {
                      setMessage("Unable to share location.");
                    }
                  }}
                >
                  Share Location
                </button>
              </div>
            </div>

            {/* SOS button */}
            <div className="sos-section">
              <p className="hint">Hold to confirm</p>
              <button ref={sosButtonRef} onClick={handleSOS} className="sos-btn">
                SOS
              </button>
              <p className="hint">Tap to open SOS confirmation</p>
            </div>
          </div>

          {/* Status */}
          <div className="status-section">
            {loading && <div className="status-text">Sending SOS…</div>}
            {message && <div className="message-box">{message}</div>}
            {lastLocation && (
              <div className="last-location">
                Last location: {lastLocation.lat.toFixed(5)}, {lastLocation.lng.toFixed(5)} (±
                {Math.round(lastLocation.accuracy)}m)
              </div>
            )}
          </div>
        </section>

        <footer className="contact-footer">
          <p>
            This page requests location access to share your position with emergency services. Replace placeholder
            numbers and integrate a secure backend to forward SOS data.
          </p>
        </footer>
      </div>

      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Confirm SOS</h3>
            <p>Are you sure you want to send your location to emergency services?</p>
            <div className="modal-actions">
              <button className="cancel-btn" onClick={() => setModalOpen(false)}>
                Cancel
              </button>
              <button className="confirm-btn" onClick={confirmSOS}>
                Yes — Send SOS
              </button>
            </div>
            <p className="modal-tip">Tip: Use quick call buttons for faster response.</p>
          </div>
        </div>
      )}
    </div>
  );
}
