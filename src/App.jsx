import { useState, useMemo } from "react";
import ProductList from "./components/products/ProductList";
import ProductDetail from "./components/products/ProductDetail";
import CartDrawer from "./components/cart/CartDrawer";
import ThemeControls from "./components/ui/ThemeControls";
import useSwipe from "./gestures/useSwipe";
import { Capacitor } from "@capacitor/core";

export default function App() {
  const [selected, setSelected] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);

  const allowLeftEdge = useMemo(() => {
    const isNative = Capacitor?.isNativePlatform?.() === true;
    const isIOSStandalone =
      typeof navigator !== "undefined" &&
      "standalone" in navigator &&
      navigator.standalone === true;
    return isNative || isIOSStandalone; // Capacitor o PWA "Add to Home Screen"
  }, []);

  useSwipe({
    onLeftFromRightEdge: () => setCartOpen(true), // → abre carrito
    onLeft: () => setCartOpen(false), // ← cierra carrito
    onRightFromLeftEdge:
      allowLeftEdge && selected ? () => setSelected(null) : undefined, // ← volver desde detalle
    minDX: 60,
    maxDY: 60,
    leftEdge: 28,
    rightEdge: 28,
  });

  return (
    <div className="page">
      <header className="nav">
        <div
          className="container"
          style={{ display: "flex", gap: 8, alignItems: "center", padding: 12 }}
        >
          <h1 style={{ margin: 0 }}>EcomChat</h1>
          <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
            <ThemeControls />
            <button className="btn" onClick={() => setCartOpen(true)}>
              🛒
            </button>
          </div>
        </div>
      </header>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />

      <main>
        {!selected && <ProductList onSelectProduct={setSelected} />}
        {selected && (
          <ProductDetail
            product={selected}
            onBack={() => setSelected(null)}
            onAdded={() => setCartOpen(true)}
          />
        )}
      </main>
    </div>
  );
}
