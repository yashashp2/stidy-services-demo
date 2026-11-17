import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  ArrowUpRight,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  X,
} from "lucide-react";
import { business } from "../data/business";
import { ButtonLink, Logo } from "./UI";

const links = [
  ["/", "Home"],
  ["/domestic", "Domestic Cleaning"],
  ["/commercial", "Commercial Cleaning"],
  ["/about", "About"],
  ["/careers", "Careers"],
  ["/contact", "Contact"],
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const location = useLocation();
  useEffect(() => {
    setOpen(false);
  }, [location]);
  return (
    <>
      <div className="concept-banner">{business.notice}</div>
      <header
        className="site-header"
        onKeyDown={(e) => {
          if (e.key === "Escape" && open) {
            setOpen(false);
            menuButton.current?.focus();
          }
        }}
      >
        <div className="container nav-shell">
          <Logo />
          <nav
            className={`navigation ${open ? "is-open" : ""}`}
            id="main-navigation"
            aria-label="Main navigation"
          >
            {links.map(([to, label]) => (
              <NavLink key={to} to={to} end={to === "/"}>
                {label}
              </NavLink>
            ))}
            <span className="mobile-quote">
              <ButtonLink to="/contact">Get a Free Quote</ButtonLink>
            </span>
          </nav>
          <div className="nav-quote">
            <ButtonLink to="/contact">Get a Free Quote</ButtonLink>
          </div>
          <button
            className="menu-toggle"
            ref={menuButton}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="main-navigation"
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </header>
    </>
  );
}
export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <Logo />
            <p>
              A cleaner space.
              <br />A little more room to breathe.
            </p>
            <span className="location-line">
              <MapPin size={15} />
              {business.location}
            </span>
          </div>
          <div>
            <h3>Explore</h3>
            <Link to="/domestic">Domestic cleaning</Link>
            <Link to="/commercial">Commercial cleaning</Link>
            <Link to="/about">About Stidy</Link>
            <Link to="/careers">Join the team</Link>
          </div>
          <div>
            <h3>Let’s talk</h3>
            <a href={business.phoneHref}>{business.phone}</a>
            <a href={`mailto:${business.email}`}>{business.email}</a>
            <a href={business.whatsapp} target="_blank" rel="noreferrer">
              Message on WhatsApp <ArrowUpRight size={14} />
            </a>
            <Link to="/contact">
              Request a quote <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
        <div className="footer-bottom">
          <span>Stidy Services Ltd · Website concept</span>
          <span>
            Stock photography for illustration. Not Stidy’s team or work.
          </span>
        </div>
        <p className="footer-notice">
          {business.notice} Contact links open external apps. Forms are
          demonstration-only.
        </p>
      </div>
    </footer>
  );
}
export function WhatsApp() {
  return (
    <a
      className="whatsapp"
      href={business.whatsapp}
      target="_blank"
      rel="noreferrer"
      aria-label="Contact reported business number on WhatsApp (opens external site)"
    >
      <MessageCircle size={22} />
      <span>Let’s talk</span>
      <ArrowUpRight size={15} />
    </a>
  );
}
export function ContactDetails() {
  return (
    <div className="contact-details">
      <a href={business.phoneHref}>
        <Phone size={21} />
        <span>
          <small>GIVE STIDY A CALL</small>
          {business.phone}
        </span>
        <ArrowUpRight size={18} />
      </a>
      <a href={`mailto:${business.email}`}>
        <MessageCircle size={21} />
        <span>
          <small>DROP STIDY A LINE</small>
          {business.email}
        </span>
        <ArrowUpRight size={18} />
      </a>
    </div>
  );
}
