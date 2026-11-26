"use client";

import { useRef, type PointerEvent, type ReactNode } from "react";

export default function LaptopMockup({ children }: { children: ReactNode }) {
  const frame = useRef<HTMLElement>(null);

  function tilt(event: PointerEvent<HTMLDivElement>) {
    if (!frame.current || (event.pointerType !== "mouse" && !event.isPrimary)) return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const x = Math.max(-.5, Math.min(.5, (event.clientX - bounds.left) / bounds.width - .5));
    const y = Math.max(-.5, Math.min(.5, (event.clientY - bounds.top) / bounds.height - .5));
    frame.current.style.setProperty("--tilt-x", `${-y * 22}deg`);
    frame.current.style.setProperty("--tilt-y", `${x * 34}deg`);
  }

  function reset() {
    frame.current?.style.removeProperty("--tilt-x");
    frame.current?.style.removeProperty("--tilt-y");
  }

  return (
    <div
      className="project-visual project-visual--laptop"
      onPointerDown={tilt}
      onPointerMove={tilt}
      onPointerLeave={reset}
      onPointerCancel={reset}
      onPointerUp={reset}
    >
      <figure className="laptop" ref={frame}>
        <div className="laptop-screen">{children}</div>
        <div className="laptop-base" aria-hidden="true"><span /></div>
      </figure>
    </div>
  );
}
