"use client";

import { createElement, useEffect, useRef, useState } from "react";

export default function ParsiChinDemo() {
  const toggle = useRef<HTMLElement>(null);
  const [aligned, setAligned] = useState(false);

  useEffect(() => {
    const control = toggle.current;
    if (!control) return;

    const change = () => setAligned(control.hasAttribute("checked"));
    control.addEventListener("change", change);
    return () => control.removeEventListener("change", change);
  }, []);

  useEffect(() => {
    toggle.current?.toggleAttribute("checked", aligned);
  }, [aligned]);

  return (
    <div className="demo-card parsichin-demo">
      <div className="demo-header">
        <span className="demo-avatar" lang="fa" aria-hidden="true">پ</span>
        <div>
          <strong lang="fa">پارسی‌چین</strong>
          <span>Text direction · {aligned ? "RTL" : "LTR"}</span>
        </div>
      </div>
      <div className="demo-body parsichin-output">
        <p key={String(aligned)} lang="fa" dir={aligned ? "rtl" : "ltr"}>
          سلام، من aghrabooti هستم. ابزارهای من شامل Next.js برای وب، Telegram Bot API برای ربات‌ها و ParsiChin برای متن فارسیه.
        </p>
      </div>
      <div className="demo-actions">
        {createElement("sakuga-toggle", {
          ref: toggle,
          label: "پارسی‌چین",
        })}
        <button className="demo-fallback" type="button" aria-pressed={aligned} onClick={() => setAligned(!aligned)}>
          مرتب‌سازی
        </button>
      </div>
    </div>
  );
}
