"use client";

import Link from "next/link";
import { FormEvent, useId, useRef, useState } from "react";

import { postChat, type ChatLink } from "@/lib/backend-api";

type Message = { role: "user" | "assistant"; content: string };

export function AiConcierge() {
  const panelId = useId();
  const endRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Welcome. Tell me what you are looking for — an industry, company, or experience — and I will guide you.",
    },
  ]);
  const [links, setLinks] = useState<ChatLink[]>([]);
  const [whatsappUrl, setWhatsappUrl] = useState<string | null>(null);
  const [error, setError] = useState("");

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const content = input.trim();
    if (!content || busy) return;
    const nextMessages = [...messages, { role: "user" as const, content }];
    setMessages(nextMessages);
    setInput("");
    setBusy(true);
    setError("");
    try {
      const payload = await postChat(nextMessages.filter((m) => m.role === "user" || m.role === "assistant"));
      if (payload.error || !payload.data) {
        setError(payload.error || "Concierge unavailable");
        setMessages((current) => [
          ...current,
          { role: "assistant", content: "I could not reach the concierge just now. Please try WhatsApp." },
        ]);
      } else {
        setMessages((current) => [...current, { role: "assistant", content: payload.data!.message }]);
        setLinks(payload.data.links || []);
        setWhatsappUrl(payload.data.whatsappUrl);
      }
    } catch {
      setError("Concierge unavailable. Is the backend running?");
      setMessages((current) => [
        ...current,
        { role: "assistant", content: "The concierge service is offline at the moment." },
      ]);
    } finally {
      setBusy(false);
      requestAnimationFrame(() => endRef.current?.scrollIntoView({ behavior: "smooth" }));
    }
  };

  return (
    <>
      <button
        type="button"
        className="ai-concierge-launch"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
      >
        <span>Concierge</span>
        ◆
      </button>

      {open ? (
        <section id={panelId} className="ai-concierge-panel" aria-label="AI Concierge">
          <header className="ai-concierge-header">
            <div>
              <h2>AI Concierge</h2>
              <p className="ai-concierge-meta" style={{ margin: "4px 0 0" }}>
                Discovery assistant
              </p>
            </div>
            <button type="button" onClick={() => setOpen(false)}>
              Close
            </button>
          </header>

          <div className="ai-concierge-messages">
            {messages.map((message, index) => (
              <div key={`${message.role}-${index}`} className={`ai-concierge-bubble ${message.role}`}>
                {message.content}
              </div>
            ))}
            {busy ? <p className="ai-concierge-meta">Thinking…</p> : null}
            {error ? <p className="ai-concierge-meta">{error}</p> : null}
            <div ref={endRef} />
          </div>

          {links.length ? (
            <div className="ai-concierge-links">
              {links.slice(0, 4).map((link) => (
                <Link key={`${link.type}-${link.id}`} href={link.pathHint} className="ai-concierge-link">
                  <strong>{link.name}</strong>
                  <span>
                    {link.type} · {link.summary}
                  </span>
                </Link>
              ))}
            </div>
          ) : null}

          {whatsappUrl ? (
            <a className="ai-concierge-whatsapp" href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              Continue on WhatsApp
            </a>
          ) : null}

          <form className="ai-concierge-composer" onSubmit={onSubmit}>
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask about villas, partners…"
              aria-label="Message the concierge"
              disabled={busy}
            />
            <button type="submit" disabled={busy || !input.trim()}>
              Send
            </button>
          </form>
        </section>
      ) : null}
    </>
  );
}
