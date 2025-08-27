import { useState } from "react";
import { setTheme, setAccentChoice } from "../../css/theme";

const ACCENTS = ["mint", "emerald", "teal", "lime", "forest"];

export default function ThemeControls() {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ position: "relative" }}>
      <button
        className="btn-ghost"
        onClick={() => setOpen((o) => !o)}
        title="Tema y colores"
      >
        ⚙️
      </button>

      {open && (
        <div
          className="card"
          style={{ position: "absolute", right: 0, top: "120%", minWidth: 230 }}
        >
          <div
            style={{
              display: "flex",
              gap: 8,
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <strong>Tema</strong>
            <select
              onChange={(e) => setTheme(e.target.value)}
              defaultValue="system"
              style={{ marginLeft: "auto" }}
            >
              <option value="system">Sistema</option>
              <option value="light">Claro</option>
              <option value="dark">Oscuro</option>
            </select>
          </div>

          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <strong>Acento</strong>
            <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
              {ACCENTS.map((name) => (
                <button
                  key={name}
                  className="btn-ghost"
                  onClick={() => setAccentChoice(name)}
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: "50%",
                    border: "2px solid var(--border)",
                    background:
                      name === "mint"
                        ? "#34d399"
                        : name === "emerald"
                        ? "#10b981"
                        : name === "teal"
                        ? "#14b8a6"
                        : name === "lime"
                        ? "#84cc16"
                        : "#047857",
                  }}
                  title={name}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
