import { useEffect, useReducer } from "react";
import { Preferences } from "@capacitor/preferences";
import { CartContext } from "./cart/context"; // ← importamos del paso 1

const STORAGE_KEY = "cart_items_v1";

function reducer(state, action) {
  switch (action.type) {
    case "ADD": {
      const p = action.payload;
      const existing = state.find((i) => i.id === p.id);
      if (existing)
        return state.map((i) => (i.id === p.id ? { ...i, qty: i.qty + 1 } : i));
      return [...state, { ...p, qty: 1 }];
    }
    case "REMOVE_ONE": {
      const p = action.payload;
      return state.flatMap((i) =>
        i.id === p.id ? (i.qty > 1 ? [{ ...i, qty: i.qty - 1 }] : []) : [i]
      );
    }
    case "REMOVE_ALL":
      return state.filter((i) => i.id !== action.payload.id);
    case "CLEAR":
      return [];
    case "SET":
      return action.payload;
    default:
      return state;
  }
}

export default function CartProvider({ children }) {
  const [items, dispatch] = useReducer(reducer, []);

  // cargar del almacenamiento
  useEffect(() => {
    (async () => {
      const { value } = await Preferences.get({ key: STORAGE_KEY });
      if (value) dispatch({ type: "SET", payload: JSON.parse(value) });
    })();
  }, []);

  // guardar en cada cambio
  useEffect(() => {
    Preferences.set({ key: STORAGE_KEY, value: JSON.stringify(items) });
  }, [items]);

  const subtotal = items.reduce((acc, i) => acc + i.price * i.qty, 0);

  const api = {
    items,
    subtotal,
    add: (p) => dispatch({ type: "ADD", payload: p }),
    removeOne: (p) => dispatch({ type: "REMOVE_ONE", payload: p }),
    removeAll: (p) => dispatch({ type: "REMOVE_ALL", payload: p }),
    clear: () => dispatch({ type: "CLEAR" }),
  };

  return <CartContext.Provider value={api}>{children}</CartContext.Provider>;
}
