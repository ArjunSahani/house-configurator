"use client";

import { useState, useEffect, useRef } from "react";

export default function Home() {
  const ROOFS = [
    { id: "flat", label: "Flat", icon: "/icons/flat.svg" },
    { id: "gable", label: "Gable", icon: "/icons/gable.svg" },
    { id: "slope", label: "Slope", icon: "/icons/slope.svg" }
  ];

  const COLORS = [
    { id: "Beige", hex: "#F5F5DC" },
    { id: "Black", hex: "#2C2C2C" },
    { id: "Blue", hex: "#4169E1" },
    { id: "White", hex: "#FFFFFF" }
  ];

  const MATERIALS = [
    { id: "Farmhouse", label: "Farmhouse", icon: "/icons/farm.svg" },
    { id: "Shingles", label: "Shingles", icon: "/icons/shingle.svg" },
    { id: "Siding", label: "Siding", icon: "/icons/siding.svg" },
    { id: "Stucco", label: "Stucco", icon: "/icons/stucco.svg" }
  ];

  const [roof, setRoof] = useState("flat");
  const [color, setColor] = useState("Beige");
  const [material, setMaterial] = useState("Farmhouse");
  const [currentImage, setCurrentImage] = useState("/placeholder.webp");
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef(null);

  // Preload images for current selection
  useEffect(() => {
    // Start fade out
    setIsVisible(false);
    
    const imageUrl = `/roofs/${roof}/${roof}-${color}-${material}.webp`;
    
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    // Preload the image
    const img = new Image();
    img.src = imageUrl;
    
    img.onload = () => {
      // Small delay for smooth transition
      timeoutRef.current = setTimeout(() => {
        setCurrentImage(imageUrl);
        setIsVisible(true);
      }, 50);
    };
    
    img.onerror = () => {
      console.error("Failed to load image:", imageUrl);
      setCurrentImage("/placeholder.webp");
      setIsVisible(true);
    };
    
    // Cleanup
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      img.onload = null;
      img.onerror = null;
    };
  }, [roof, color, material]);

  // Set initial image visible
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="app">
      {/* PREVIEW */}
      <div className="preview">
        <div className="image-container">
          <img
            src={currentImage}
            alt={`${roof} roof, ${color} color, ${material} material house`}
            className={`houseImage ${isVisible ? "loaded" : ""}`}
          />
        </div>
      </div>

      {/* CONTROLS */}
      <div className="controls">
        <div className="controls-container">

          {/* ROOF */}
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

          {/* COLOR */}
          <Section title="Color">
            {COLORS.map((c) => (
              <ColorButton
                key={c.id}
                label={c.id}
                hex={c.hex}
                active={color === c.id}
                onClick={() => setColor(c.id)}
              />
            ))}
          </Section>

          {/* MATERIAL */}
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

/* ========== HELPERS ========== */
function Section({ title, children }) {
  return (
    <section className="control-section">
      <h2>{title}</h2>
      <div className="row">{children}</div>
    </section>
  );
}

function IconButton({ icon, label, active, ...props }) {
  const [svg, setSvg] = useState("");

  useEffect(() => {
    fetch(icon)
      .then((res) => res.text())
      .then((data) => setSvg(data))
      .catch(() => setSvg(""));
  }, [icon]);

  return (
    <button
      className={`custom-button ${active ? "active" : ""}`}
      aria-pressed={active}
      {...props}
    >
      <div className="button-content">
        <div
          className="icon-container"
          dangerouslySetInnerHTML={{ __html: svg }}
        />
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