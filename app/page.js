"use client";

import { useEffect, useState } from "react";

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
    { id: "Farmhouse", icon: "/icons/farm.svg" },
    { id: "Shingles", icon: "/icons/shingle.svg" },
    { id: "Siding", icon: "/icons/siding.svg" },
    { id: "Stucco", icon: "/icons/stucco.svg" }
  ];

  const [roof, setRoof] = useState("flat");
  const [color, setColor] = useState("Beige");
  const [material, setMaterial] = useState("Farmhouse");

  // Trigger smooth image transition
  const [imgKey, setImgKey] = useState(0);
  const imageUrl = `/roofs/${roof}/${roof}-${color}-${material}.webp`;

  useEffect(() => {
    // Increment key to force React to re-render img for smooth animation
    setImgKey((prev) => prev + 1);
  }, [roof, color, material]);

  return (
    <main className="app">
      {/* PREVIEW */}
      <div className="preview">
        <div className="image-container">
          <img
            key={imgKey}
            src={imageUrl}
            alt="House Preview"
            className="houseImage smooth"
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

/* ===================== */
/* HELPERS (SAME FILE)   */
/* ===================== */

function Section({ title, children }) {
  return (
    <section className="control-section">
      <h2>{title}</h2>
      <div className="row">{children}</div>
    </section>
  );
}

/* ---------- ICON BUTTON ---------- */

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

/* ---------- COLOR BUTTON ---------- */

function ColorButton({ hex, label, active, ...props }) {
  return (
    <button
      className={`custom-button ${active ? "active" : ""}`}
      aria-pressed={active}
      {...props}
    >
      <div className="button-content">
        <span
          className="color-swatch"
          style={{ backgroundColor: hex }}
        />
        <span className="label">{label}</span>
      </div>
    </button>
  );
}
