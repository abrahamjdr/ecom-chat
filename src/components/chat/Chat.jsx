import { useEffect, useRef, useState } from "react";
import { Preferences } from "@capacitor/preferences";

const KEY = "chat_history";

export default function ChatPanel({ open, onClose }) {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "¡Hola! ¿En qué puedo ayudarte?" },
  ]);
  const [draft, setDraft] = useState("");
  const endRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { value } = await Preferences.get({ key: KEY });
      if (value) setMessages(JSON.parse(value));
    })();
  }, []);

  useEffect(() => {
    Preferences.set({ key: KEY, value: JSON.stringify(messages) });
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = () => {
    if (!draft.trim()) return;
    const userMsg = { sender: "user", text: draft };
    setDraft("");
    setMessages((m) => [...m, userMsg]);
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        { sender: "bot", text: "Gracias, ¡en breve te respondemos!" },
      ]);
    }, 600);
  };

  if (!open) return null;

  return (
    <>
      <div className="chat-overlay" onClick={onClose} />
      <section
        className="chat-sheet"
        role="dialog"
        aria-label="Chat de soporte"
      >
        <div className="chat-header">
          <strong>Soporte</strong>
          <button
            className="btn-ghost"
            style={{ marginLeft: "auto" }}
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <div className="chat-body">
          {messages.map((msg, i) => (
            <div
              key={i}
              className="chat-row"
              style={{ textAlign: msg.sender === "user" ? "right" : "left" }}
            >
              <span
                className={`chat-bubble ${msg.sender === "user" ? "me" : ""}`}
              >
                {msg.text}
              </span>
            </div>
          ))}
          <div ref={endRef} />
        </div>

        <div className="chat-input">
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="Escribe un mensaje…"
          />
          <button className="btn" onClick={send}>
            Enviar
          </button>
        </div>
      </section>
    </>
  );
}
