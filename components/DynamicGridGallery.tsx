"use client";

import { ChevronLeft, ChevronRight, MonitorSmartphone } from "lucide-react";
import { useRef, useState, type CSSProperties, type KeyboardEvent, type TouchEvent } from "react";
import NovaSweep from "@/components/backgrounds/NovaSweep";
import { skills } from "@/data/portfolio";

// Grid track expansion adapted from useLayouts' MIT-licensed Dynamic Grid Gallery.
export default function DynamicGridGallery() {
  const [selected, setSelected] = useState(0);
  const [preview, setPreview] = useState<number | null>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const active = preview ?? selected;

  function move(offset: number) {
    setPreview(null);
    setSelected((index) => (index + offset + skills.length) % skills.length);
  }

  function handleKey(event: KeyboardEvent<HTMLElement>) {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    move(event.key === "ArrowLeft" ? -1 : 1);
  }

  function handleTouchEnd(event: TouchEvent) {
    const start = touchStart.current;
    const end = event.changedTouches[0];
    touchStart.current = null;
    if (!start || !end) return;

    const x = end.clientX - start.x;
    const y = end.clientY - start.y;
    if (Math.abs(x) > 40 && Math.abs(x) > Math.abs(y)) move(x < 0 ? 1 : -1);
  }

  const track = (count: number, activeTrack: number) => Array.from(
    { length: count },
    (_, index) => index === activeTrack ? "minmax(0, 1.65fr)" : "minmax(0, 1fr)",
  ).join(" ");

  return (
    <section className="shell skills-gallery" id="skills" aria-labelledby="skills-title" onKeyDown={handleKey}>
      <NovaSweep className="section-sweep section-sweep--skills" color="#43c4df" backgroundColor="#111111" rotation={28} speed={0.2} resolutionScale={0.5} />
      <div className="skills-gallery-header">
        <h2 id="skills-title">Skills in practice</h2>
        <div className="skills-controls">
          <button type="button" aria-label="Previous skill" onClick={() => move(-1)}><ChevronLeft aria-hidden="true" /></button>
          <button type="button" aria-label="Next skill" onClick={() => move(1)}><ChevronRight aria-hidden="true" /></button>
        </div>
      </div>
      <div
        className="skills-grid"
        style={{
          gridTemplateColumns: track(3, active % 3),
          gridTemplateRows: track(2, Math.floor(active / 3)),
          "--mobile-rows": track(3, Math.floor(active / 2)),
        } as CSSProperties}
        onPointerLeave={() => setPreview(null)}
        onTouchStart={(event) => {
          const touch = event.touches[0];
          if (touch) touchStart.current = { x: touch.clientX, y: touch.clientY };
        }}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={() => { touchStart.current = null; }}
      >
        {skills.map((item, index) => (
          <div
            className="skill-card"
            key={item.name}
            data-active={active === index}
            onPointerEnter={(event) => { if (event.pointerType === "mouse") setPreview(index); }}
          >
            <button
              type="button"
              aria-pressed={selected === index}
              onFocus={() => setPreview(null)}
              onClick={() => { setPreview(null); setSelected(index); }}
            >
              <span className="skill-logos" aria-hidden="true">
                {item.logos.length ? item.logos.map((logo) => (
                  <i key={logo} style={{ maskImage: `url(/skills/${logo}.svg)` }} />
                )) : <MonitorSmartphone />}
              </span>
              <span>{item.name}</span>
            </button>
            {active === index && (
              <div className="skill-card-detail">
                <p>{item.description}</p>
                <a href={item.href}>{item.project}</a>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
