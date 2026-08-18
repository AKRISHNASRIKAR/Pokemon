"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
}

const SPRING = { stiffness: 300, damping: 25, mass: 0.5 };

/** Wraps children in a mouse-tracked 3D tilt with a cursor-following glare. */
export function TiltCard({ children, className }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const pointerX = useMotionValue(0.5);
  const pointerY = useMotionValue(0.5);

  const rotateX = useSpring(
    useTransform(pointerY, [0, 1], [10, -10]),
    SPRING
  );
  const rotateY = useSpring(
    useTransform(pointerX, [0, 1], [-10, 10]),
    SPRING
  );
  const glareX = useTransform(pointerX, (value) => `${value * 100}%`);
  const glareY = useTransform(pointerY, (value) => `${value * 100}%`);
  const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, rgb(255 255 255 / 0.16), transparent 55%)`;

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    if (prefersReducedMotion) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    pointerX.set((event.clientX - rect.left) / rect.width);
    pointerY.set((event.clientY - rect.top) / rect.height);
  }

  function handleMouseLeave() {
    pointerX.set(0.5);
    pointerY.set(0.5);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: prefersReducedMotion ? 0 : rotateX,
        rotateY: prefersReducedMotion ? 0 : rotateY,
        transformStyle: "preserve-3d",
      }}
      className={cn("relative", className)}
    >
      {children}
      <motion.span
        aria-hidden="true"
        style={{ background: glareBackground }}
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
    </motion.div>
  );
}
