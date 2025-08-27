import { useEffect, useRef } from "react";

export default function useSwipe(userOpts = {}) {
  // almacén con los callbacks/opciones siempre frescos
  const optsRef = useRef({
    onLeftFromRightEdge: undefined,
    onRightFromLeftEdge: undefined,
    onLeft: undefined,
    onRight: undefined,
    minDX: 60,
    maxDY: 60,
    leftEdge: 28,
    rightEdge: 28,
  });

  // ❗ Desestructura fuera del efecto (así no usamos 'opts' dentro)
  const {
    onLeftFromRightEdge,
    onRightFromLeftEdge,
    onLeft,
    onRight,
    minDX = 60,
    maxDY = 60,
    leftEdge = 28,
    rightEdge = 28,
  } = userOpts;

  // actualiza el ref cuando cambian callbacks/umbrales (sin tocar listeners)
  useEffect(() => {
    optsRef.current = {
      ...optsRef.current,
      onLeftFromRightEdge,
      onRightFromLeftEdge,
      onLeft,
      onRight,
      minDX,
      maxDY,
      leftEdge,
      rightEdge,
    };
  }, [
    onLeftFromRightEdge,
    onRightFromLeftEdge,
    onLeft,
    onRight,
    minDX,
    maxDY,
    leftEdge,
    rightEdge,
  ]);

  const startX = useRef(null);
  const startY = useRef(null);

  useEffect(() => {
    const getPoint = (e) => {
      const p = e.touches?.[0] ?? e.changedTouches?.[0] ?? e;
      return { x: p.clientX, y: p.clientY };
    };

    const start = (e) => {
      const { x, y } = getPoint(e);
      startX.current = x;
      startY.current = y;
    };

    const end = (e) => {
      if (startX.current == null) return;

      const {
        onLeftFromRightEdge,
        onRightFromLeftEdge,
        onLeft,
        onRight,
        minDX,
        maxDY,
        leftEdge,
        rightEdge,
      } = optsRef.current;

      const { x, y } = getPoint(e);
      const dx = x - startX.current;
      const dy = y - startY.current;

      if (Math.abs(dy) > maxDY || Math.abs(dx) < minDX) {
        startX.current = startY.current = null;
        return;
      }

      const fromLeftEdge = startX.current <= leftEdge;
      const fromRightEdge = window.innerWidth - startX.current <= rightEdge;

      if (dx > 0) {
        if (fromLeftEdge && onRightFromLeftEdge) onRightFromLeftEdge();
        else if (onRight) onRight();
      } else {
        if (fromRightEdge && onLeftFromRightEdge) onLeftFromRightEdge();
        else if (onLeft) onLeft();
      }

      startX.current = startY.current = null;
    };

    // registramos una sola vez
    window.addEventListener("pointerdown", start, { passive: true });
    window.addEventListener("pointerup", end, { passive: true });
    window.addEventListener("touchstart", start, { passive: true });
    window.addEventListener("touchend", end, { passive: true });

    return () => {
      window.removeEventListener("pointerdown", start);
      window.removeEventListener("pointerup", end);
      window.removeEventListener("touchstart", start);
      window.removeEventListener("touchend", end);
    };
  }, []); // sin dependencias: los handlers leen de optsRef.current
}
