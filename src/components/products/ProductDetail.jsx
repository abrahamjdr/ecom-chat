import { Haptics, ImpactStyle } from "@capacitor/haptics";
import { useCart } from "../../cart/context";
import { notifyAdded } from "../../native/notify";
import { Capacitor } from "@capacitor/core";

export default function ProductDetail({ product, onBack, onAdded }) {
  const { add } = useCart();

  const addAndOpen = async () => {
    add(product);

    // Solo intenta plugins en nativo (Capacitor) para evitar errores en web
    if (Capacitor.isNativePlatform()) {
      try {
        await Haptics.impact({ style: ImpactStyle.Medium });
      } catch {
        console.error("Error occurred while triggering haptic feedback");
      }
      try {
        await notifyAdded(product.title);
      } catch {
        console.error("Error occurred while scheduling notification");
      }
    }

    onAdded?.(); // abre el drawer del carrito
  };

  return (
    <div className="container" style={{ paddingTop: 16 }}>
      <button className="btn-ghost" onClick={onBack}>
        ← Volver
      </button>

      <section
        className="card"
        style={{
          marginTop: 16,
          display: "grid",
          gap: 20,
          gridTemplateColumns: "1fr",
          alignItems: "start",
        }}
      >
        {/* responsive dos columnas en desktop */}
        <style>{`@media (min-width: 900px){ .pd-grid{ grid-template-columns: 1.1fr 1fr; } }`}</style>
        <div className="pd-grid" style={{ display: "grid", gap: 20 }}>
          <div
            style={{
              background: "#0f1714",
              borderRadius: 12,
              padding: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={product.image}
              alt={product.title}
              style={{ maxWidth: "100%", maxHeight: 420, objectFit: "contain" }}
            />
          </div>

          <div>
            <h2 style={{ marginTop: 0 }}>{product.title}</h2>
            <p style={{ color: "var(--muted)", fontStyle: "italic" }}>
              {product.category}
            </p>
            <p>{product.description}</p>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginTop: 12,
              }}
            >
              <span className="badge" style={{ fontSize: 14 }}>
                ${product.price}
              </span>
              <button className="btn" onClick={addAndOpen}>
                Añadir al carrito
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
