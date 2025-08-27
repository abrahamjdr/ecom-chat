import { createContext, useContext } from "react";

export const CartContext = createContext(null);

// Hook de uso del contexto (no es componente, por eso lo separamos)
export const useCart = () => useContext(CartContext);
