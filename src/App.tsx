import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { Footer, Header, WhatsApp } from "./components/Layout";
import { ButtonLink } from "./components/UI";
import Home from "./pages/Home";
import Service from "./pages/Service";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Careers from "./pages/Careers";

const titles: Record<string, string> = {
  "/": "Cleaning in Ilford & East London",
  "/domestic": "Domestic Cleaning",
  "/commercial": "Commercial Cleaning",
  "/about": "About Stidy",
  "/careers": "Join the Stidy Team",
  "/contact": "Request a Quote",
};
export default function App() {
  const { pathname } = useLocation();
  useEffect(() => {
    document.title = `${titles[pathname] ?? "Page not found"} | Stidy Services — Concept`;
    window.scrollTo({ top: 0, behavior: "instant" });
    document.getElementById("main-content")?.focus({ preventScroll: true });
  }, [pathname]);
  return (
    <>
      <a
        className="skip-link"
        href="#main-content"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById("main-content")?.focus();
        }}
      >
        Skip to content
      </a>
      <Header />
      <main id="main-content" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/domestic" element={<Service kind="domestic" />} />
          <Route path="/commercial" element={<Service kind="commercial" />} />
          <Route path="/about" element={<About />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="*"
            element={
              <section className="container not-found">
                <p className="eyebrow">404 · A LITTLE OUT OF PLACE</p>
                <h1>
                  Let’s get you
                  <br />
                  <em>back home.</em>
                </h1>
                <ButtonLink to="/">Back to home</ButtonLink>
              </section>
            }
          />
        </Routes>
      </main>
      <Footer />
      <WhatsApp />
    </>
  );
}
