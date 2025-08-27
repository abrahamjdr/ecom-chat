import { useState } from "react";
import ProductList from "./ProductList";
import ProductDetail from "./ProductDetail";
import Chat from "./Chat";

export default function App() {
  const [selected, setSelected] = useState(null);
  const [showChat, setShowChat] = useState(false);

  return (
    <div style={{ padding: 16 }}>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>EcomChat</h1>
        <button onClick={() => setShowChat(true)}>Soporte</button>
      </header>

      {!showChat && !selected && <ProductList onSelectProduct={setSelected} />}
      {!showChat && selected && (
        <ProductDetail
          product={selected}
          onBack={() => setSelected(null)}
          onAddToCart={(p) => console.log("ADD TO CART", p)}
        />
      )}
      {showChat && <Chat onBack={() => setShowChat(false)} />}
    </div>
  );
}
