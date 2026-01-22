"use client";

import { useState, useEffect, useRef } from "react";

export default function Home() {
  const ROOFS = [
    { id: "flat", label: "Flat", icon: "/icons/flat.svg" },
    { id: "gable", label: "Gable", icon: "/icons/gable.svg" },
    { id: "slope", label: "Slope", icon: "/icons/slope.svg" }
  ];

  const COLORS = [
    { id: "beige", label: "Beige", hex: "#F5F5DC" },
    { id: "black", label: "Black", hex: "#2C2C2C" },
    { id: "blue", label: "Blue", hex: "#4169E1" },
    { id: "white", label: "White", hex: "#FFFFFF" }
  ];

  const MATERIALS = [
    { id: "farmhouse", label: "Farmhouse", icon: "/icons/farm.svg" },
    { id: "shingles", label: "Shingles", icon: "/icons/shingle.svg" },
    { id: "siding", label: "Siding", icon: "/icons/siding.svg" },
    { id: "stucco", label: "Stucco", icon: "/icons/stucco.svg" }
  ];

  const [roof, setRoof] = useState("flat");
  const [color, setColor] = useState("beige");
  const [material, setMaterial] = useState("farmhouse");
  const [currentImage, setCurrentImage] = useState("/placeholder.webp");
  const [isVisible, setIsVisible] = useState(true);

  const timeoutRef = useRef(null);

  const getImageUrl = () =>
    `/roofs/${roof}/${roof}-${color}-${material}.webp`;





  useEffect(() => {
    setIsVisible(false);

    const imageUrl = getImageUrl();
    const img = new Image();
    img.src = imageUrl;

    img.onload = () => {
      timeoutRef.current = setTimeout(() => {
        setCurrentImage(imageUrl);
        setIsVisible(true);
      }, 40);
    };

    img.onerror = () => {
      setCurrentImage("/placeholder.webp");
      setIsVisible(true);
    };

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [roof, color, material]);

  return (
    <main className="app">
      <div className="preview">
        <div className="image-container">
          <img
            src={currentImage}
            alt={`${roof} roof, ${color} color, ${material} material house`}
            className={`houseImage ${isVisible ? "loaded" : ""}`}
            onError={(e) => {
              e.currentTarget.src = "/placeholder.webp";
              setIsVisible(true);
            }}
          />
        </div>
      </div>

      <div className="controls">
        <div className="controls-container">

          <Section title="Roof Type">
            {ROOFS.map((r) => (
              <IconButton
                key={r.id}
                icon={r.icon}
                label={r.label}
                active={roof === r.id}
                onClick={() => setRoof(r.id)}
              />
            ))}
          </Section>

          <Section title="Color">
            {COLORS.map((c) => (
              <ColorButton
                key={c.id}
                label={c.label}
                hex={c.hex}
                active={color === c.id}
                onClick={() => setColor(c.id)}
              />
            ))}
          </Section>

          <Section title="Material">
            {MATERIALS.map((m) => (
              <IconButton
                key={m.id}
                icon={m.icon}
                label={m.label}
                active={material === m.id}
                onClick={() => setMaterial(m.id)}
              />
            ))}
          </Section>

        </div>
      </div>
    </main>
  );
}

/* ================= HELPERS ================= */

function Section({ title, children }) {
  return (
    <section className="control-section">
      <h2>{title}</h2>
      <div className="row">{children}</div>
    </section>
  );
}

function IconButton({ icon, label, active, ...props }) {
  return (
    <button
      className={`custom-button ${active ? "active" : ""}`}
      aria-pressed={active}
      {...props}
    >
      <div className="button-content">
        <img src={icon} alt="" className="icon-container" aria-hidden />
        <span className="label">{label}</span>
      </div>
    </button>
  );
}

function ColorButton({ hex, label, active, ...props }) {
  return (
    <button
      className={`custom-button ${active ? "active" : ""}`}
      aria-pressed={active}
      {...props}
    >
      <div className="button-content">
        <span className="color-swatch" style={{ backgroundColor: hex }} />
        <span className="label">{label}</span>
      </div>
    </button>
  );
}
