import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import type { ImgHTMLAttributes, ReactNode } from "react";
import { asset } from "../data/business";

export function Photo({
  name,
  sizes = "(max-width: 640px) calc(100vw - 40px), (max-width: 960px) 50vw, 640px",
  ...props
}: { name: string } & Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  "src" | "srcSet"
>) {
  return (
    <img
      {...props}
      src={asset(`images/${name}.jpg`)}
      srcSet={`${asset(`images/${name}-750.jpg`)} 750w, ${asset(`images/${name}.jpg`)} 1500w`}
      sizes={sizes}
    />
  );
}

export function Logo() {
  return (
    <Link to="/" className="brand" aria-label="Stidy Services home">
      <Sparkles strokeWidth={1.3} aria-hidden="true" />
      <span>
        stidy<span className="brand-dot">.</span>
        <small>SERVICES</small>
      </span>
    </Link>
  );
}
export function ButtonLink({
  to,
  children,
  light = false,
  outline = false,
}: {
  to: string;
  children: ReactNode;
  light?: boolean;
  outline?: boolean;
}) {
  return (
    <Link
      to={to}
      className={`button ${light ? "button-light" : ""} ${outline ? "button-outline" : ""}`}
    >
      {children}
      <ArrowUpRight size={17} aria-hidden="true" />
    </Link>
  );
}
export function Reveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.55 }}
    >
      {children}
    </motion.div>
  );
}
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="eyebrow">
      <span />
      {children}
    </p>
  );
}
export function DraftNote({ children }: { children: ReactNode }) {
  return (
    <p className="draft-note">
      <span>CONCEPT NOTE</span>
      {children}
    </p>
  );
}
