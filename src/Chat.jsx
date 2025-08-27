import { useEffect, useRef, useState } from "react";
import { loadChat, saveChat } from "./chatStore";

export default function Chat({ onBack }) {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "¡Hola! ¿En qué puedo ayudarte?" },
  ]);
  const [draft, setDraft] = useState("");
  const endRef = useRef(null);

  useEffect(() => {
    (async () => {
      const cached = await loadChat();
      if (cached.length) setMessages(cached);
    })();
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
    saveChat(messages);
  }, [messages]);

  const send = () => {
    if (!draft.trim()) return;
    setMessages((m) => [...m, { sender: "user", text: draft }]);
    setDraft("");
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        { sender: "bot", text: "Gracias, en breve te respondemos." },
      ]);
    }, 900);
  };

  return (
    <div style={{ padding: 8 }}>
      <h2>Chat de soporte</h2>
      <div
        style={{
          maxHeight: 320,
          overflowY: "auto",
          border: "1px solid #ddd",
          padding: 8,
        }}
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              textAlign: msg.sender === "user" ? "right" : "left",
              margin: "6px 0",
            }}
          >
            <span
              style={{
                display: "inline-block",
                padding: "6px 10px",
                borderRadius: 12,
                background: msg.sender === "user" ? "#dcf8c6" : "#eee",
              }}
            >
              {msg.text}
            </span>
          </div>
        ))}
        <div ref={endRef} />
      </div>
      <div style={{ marginTop: 8 }}>
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Escribe…"
          style={{ width: "75%" }}
        />
        <button onClick={send}>Enviar</button>
      </div>
      <button onClick={onBack} style={{ marginTop: 8 }}>
        ← Volver
      </button>
    </div>
  );
}
