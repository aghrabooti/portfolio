"use client";

import { useReducedMotion } from "framer-motion";
import { Send } from "lucide-react";
import { createElement, useEffect, useState } from "react";

export default function TelegramDemo() {
  const reduceMotion = useReducedMotion();
  const [run, setRun] = useState(0);
  const [repliedRun, setRepliedRun] = useState(0);

  useEffect(() => {
    if (!run || reduceMotion) return;
    const timeout = window.setTimeout(() => setRepliedRun(run), 1200);
    return () => window.clearTimeout(timeout);
  }, [reduceMotion, run]);

  const started = run > 0;
  const replied = started && (reduceMotion || repliedRun === run);
  const start = () => setRun((value) => value + 1);
  const label = started ? "Restart" : "Start";

  return (
    <div className="demo-card telegram-demo">
      <div className="demo-header">
        <span className="demo-avatar"><Send size={18} aria-hidden="true" /></span>
        <div><strong>Academy bot</strong><span>Chat demo</span></div>
      </div>
      <div className="demo-body telegram-messages" aria-live="polite">
        {started && <code key={run} className="telegram-command">/start</code>}
        {started && !replied && <span className="telegram-typing">Typing…</span>}
        {replied && (
          <p className="telegram-reply" lang="fa" dir="rtl">سلام، خوش اومدی! برای ثبت‌نام، دوره‌ات رو انتخاب کن.</p>
        )}
      </div>
      <div className="demo-actions">
        {createElement("sakuga-button", { onClick: start }, label)}
        <button className="demo-fallback" type="button" onClick={start}>{label}</button>
      </div>
    </div>
  );
}
