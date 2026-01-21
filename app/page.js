"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const ROOFS = [
    { id: "flat", label: "Flat", image: "/icons/1.png" },
    { id: "gable", label: "Gable", image: "/icons/2.png" },
    { id: "slope", label: "Slope", image: "/icons/3.png" }
  ];
  
  const COLORS = [
    { id: "Beige", hex: "#F5F5DC" },
    { id: "Black", hex: "#2C2C2C" },
    { id: "Blue", hex: "#4169E1" },
    { id: "White", hex: "#FFFFFF" }
  ];
  
  const MATERIALS = [
    { id: "Farmhouse", image: "/icons/farm.png" },
    { id: "Shingles", image: "/icons/shingle.png" },
    { id: "Siding", image: "/icons/siding.png" },
    { id: "Stucco", image: "/icons/stucco.png" }
  ];

  const [roof, setRoof] = useState("flat");
  const [color, setColor] = useState("Beige");
  const [material, setMaterial] = useState("Farmhouse");
  const [fade, setFade] = useState(true);

  const imageUrl = `/roofs/${roof}/${capitalize(roof)}-${color}-${material}.jpg`;

  // Trigger fade on change
  useEffect(() => {
    setFade(false);
    const timer = setTimeout(() => setFade(true), 150);
    return () => clearTimeout(timer);
  }, [roof, color, material]);

  return (
    <div className="app">
      {/* PREVIEW - Take most space */}
      <div className="preview">
        <div className="image-container">
          <img
            src={imageUrl}
            className={`houseImage ${fade ? "fade-in" : "fade-out"}`}
            alt={`${roof} roof with ${color} ${material} material`}
            onError={(e) => {
              e.target.src = "https://placehold.co/600x400/F6F6F6/999?text=Preview";
            }}
            loading="lazy"
          />
        </div>
      </div>

      {/* CONTROLS - Compact at bottom */}
      <div className="controls">
        <div className="controls-container">
          <Section title="Roof Type">
            {ROOFS.map((r) => (
              <Button 
                key={r.id} 
                active={roof === r.id} 
                onClick={() => setRoof(r.id)}
                type="roof"
                image={r.image}
                label={r.label}
                fallbackIcon="🏠"
              />
            ))}
          </Section>

          <Section title="Color">
            {COLORS.map((c) => (
              <Button 
                key={c.id} 
                active={color === c.id} 
                onClick={() => setColor(c.id)}
                type="color"
                colorHex={c.hex}
                label={c.id}
              />
            ))}
          </Section>

          <Section title="Material">
            {MATERIALS.map((m) => (
              <Button
                key={m.id}
                active={material === m.id}
                onClick={() => setMaterial(m.id)}
                type="material"
                image={m.image}
                label={m.id}
                fallbackIcon="🧱"
              />
            ))}
          </Section>
        </div>
      </div>
    </div>
  );
}

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function Section({ title, children }) {
  return (
    <section className="control-section">
      <h2>{title}</h2>
      <div className="row">{children}</div>
    </section>
  );
}

function Button({ active, type, image, colorHex, label, fallbackIcon, ...props }) {
  const [imgError, setImgError] = useState(false);

  const getButtonContent = () => {
    switch(type) {
      case "color":
        return (
          <div className="button-content">
            <div 
              className="color-swatch" 
              style={{ backgroundColor: colorHex }}
            />
            <span className="label">{label}</span>
          </div>
        );
      case "roof":
      case "material":
        return (
          <div className="button-content">
            <div className="icon-container">
              {!imgError && image ? (
                <img 
                  src={image} 
                  alt={label}
                  className="option-image"
                  onError={() => setImgError(true)}
                  loading="lazy"
                />
              ) : (
                <span className="fallback-icon">{fallbackIcon}</span>
              )}
            </div>
            <span className="label">{label}</span>
          </div>
        );
      default:
        return label;
    }
  };

  return (
    <button 
      className={`custom-button ${active ? "active" : ""}`} 
      aria-pressed={active}
      {...props}
    >
      {getButtonContent()}
    </button>
  );
}