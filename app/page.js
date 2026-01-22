"use client";

import { useState, useEffect } from "react";


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
  const [loaded, setLoaded] = useState(false);

  const imageUrl = `/roofs/${roof}/${roof}-${color}-${material}.webp`;

  return (
    <main className="app">
      {/* PREVIEW */}
      <div className="preview">
        <div className="image-container">
          <img
            src={imageUrl}
            alt="House Preview"
            className={`houseImage ${loaded ? "loaded" : ""}`}
            onLoad={() => setLoaded(true)}
            onError={(e) => (e.currentTarget.src = "/placeholder.webp")}
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
                onClick={() => { setLoaded(false); setRoof(r.id); }}
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
                onClick={() => { setLoaded(false); setColor(c.id); }}
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
                onClick={() => { setLoaded(false); setMaterial(m.id); }}
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
