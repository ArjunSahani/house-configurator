"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const ROOFS = ["flat", "gable", "slope"];
  const COLORS = ["Beige", "Black", "Blue", "White"];
  const MATERIALS = ["Farmhouse", "Shingles", "Siding", "Stucco"];

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
      {/* PREVIEW */}
      <div className="preview">
        <img
          src={imageUrl}
          className={`houseImage ${fade ? "fade-in" : "fade-out"}`}
          alt="House preview"
        />
      </div>

      {/* CONTROLS */}
      <div className="controls">
        <Section title="Roof Type">
          {ROOFS.map((r) => (
            <Button key={r} active={roof === r} onClick={() => setRoof(r)}>
              {r}
            </Button>
          ))}
        </Section>

        <Section title="Color">
          {COLORS.map((c) => (
            <Button key={c} active={color === c} onClick={() => setColor(c)}>
              {c}
            </Button>
          ))}
        </Section>

        <Section title="Material">
          {MATERIALS.map((m) => (
            <Button
              key={m}
              active={material === m}
              onClick={() => setMaterial(m)}
            >
              {m}
            </Button>
          ))}
        </Section>
      </div>
    </div>
  );
}

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function Section({ title, children }) {
  return (
    <section>
      <h2>{title}</h2>
      <div className="row">{children}</div>
    </section>
  );
}

function Button({ children, active, ...props }) {
  return (
    <button className={active ? "active" : ""} {...props}>
      {children}
    </button>
  );
}