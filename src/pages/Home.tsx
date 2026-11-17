import {
  ArrowDown,
  ArrowUpRight,
  House,
  MapPin,
  Sparkles,
  Sun,
  BriefcaseBusiness,
  MessageCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import { business, services } from "../data/business";
import {
  ButtonLink,
  DraftNote,
  Eyebrow,
  Photo,
  Reveal,
} from "../components/UI";

export default function Home() {
  return (
    <>
      <section className="hero container">
        <div className="hero-copy">
          <Eyebrow>A FRESH PERSPECTIVE ON CLEAN</Eyebrow>
          <h1>
            {business.hero.headingLines.map((line) => (
              <span key={line}>
                {line}
                <br />
              </span>
            ))}
            <em>{business.hero.accent}</em>
          </h1>
          <p className="hero-description">{business.hero.description}</p>
          <div className="hero-actions">
            <ButtonLink to="/contact">Get a Free Quote</ButtonLink>
            <a
              className="text-link"
              href="#services"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("services")
                  ?.scrollIntoView({
                    behavior: matchMedia("(prefers-reduced-motion: reduce)")
                      .matches
                      ? "instant"
                      : "smooth",
                  });
              }}
            >
              Explore Our Services
              <ArrowDown size={16} />
            </a>
          </div>
          <div className="hero-location">
            <span className="location-icon">
              <MapPin size={18} strokeWidth={1.5} />
            </span>
            <span>
              Locally based. Thoughtfully considered.
              <small>ILFORD & EAST LONDON</small>
            </span>
          </div>
        </div>
        <div className="hero-visual">
          <Photo
            className="hero-image"
            name="living-room"
            alt={services.domestic.alt}
            width="1500"
            height="1000"
            fetchPriority="high"
          />
          <div className="image-label">
            <span />A LITTLE MORE ROOM TO BREATHE
          </div>
          <div className="hero-note">
            <span className="note-icon">
              <Sparkles size={27} strokeWidth={1.3} />
            </span>
            <div>
              A fresh space.
              <br />
              <em>A fresh start.</em>
            </div>
            <span className="note-line" />
          </div>
          <span className="image-caption">
            Illustrative interior · Stock photography
          </span>
        </div>
      </section>
      <div className="trust-strip">
        <div className="container">
          <span>
            <MapPin />
            Based in Ilford
          </span>
          <span>
            <House />
            Domestic & commercial
          </span>
          <span>
            <MessageCircle />A conversation comes first
          </span>
          <span>
            <Sun />A fresh approach to your space
          </span>
        </div>
      </div>
      <section className="section container" id="services">
        <Reveal>
          <div className="section-heading">
            <div>
              <Eyebrow>OUR SERVICES</Eyebrow>
              <h2>
                Every space deserves
                <br />
                <em>a little care.</em>
              </h2>
            </div>
            <p>
              From the place you unwind to the place you work.
              <br className="desktop-break" /> Find the right starting point for
              your clean.
            </p>
          </div>
        </Reveal>
        <div className="service-grid">
          {Object.entries(services).map(([key, service], index) => (
            <Reveal key={key}>
              <Link className="service-card" to={`/${key}`}>
                <div className="service-image">
                  <Photo
                    name={service.image}
                    alt={service.alt}
                    loading="lazy"
                    width="750"
                    height="500"
                  />
                  <span className="service-tag">
                    {index === 0 ? (
                      <House size={16} />
                    ) : (
                      <BriefcaseBusiness size={16} />
                    )}
                    {index === 0 ? "FOR YOUR HOME" : "FOR YOUR BUSINESS"}
                  </span>
                </div>
                <div className="service-content">
                  <div className="service-title">
                    <h3>{service.name}</h3>
                    <span className="circle-arrow">
                      <ArrowUpRight size={22} />
                    </span>
                  </div>
                  <p>{service.description}</p>
                  <span className="service-link">
                    Explore {index === 0 ? "domestic" : "commercial"} cleaning{" "}
                    <ArrowUpRight size={15} />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
        <p className="section-footnote">
          Service scope and availability to be agreed directly with Stidy.
          Images are illustrative.
        </p>
      </section>
      <section className="about-section">
        <div className="container about-grid">
          <Reveal className="about-photo">
            <Photo
              name="detail"
              alt="Illustrative bright interior with natural textures and carefully arranged furnishings"
              loading="lazy"
              width="1000"
              height="1200"
            />
            <div className="photo-caption">
              LESS TO THINK ABOUT. MORE TO ENJOY.
            </div>
          </Reveal>
          <Reveal className="about-copy">
            <Eyebrow>LOCAL ROOTS. A PERSONAL TOUCH.</Eyebrow>
            <h2>
              It’s more than a clean.
              <br />
              <em>It’s how a space feels.</em>
            </h2>
            <p>
              A calm morning. A welcoming workplace. That lovely feeling when
              everything is in its place.
            </p>
            <p>
              Based in Ilford, Stidy Services offers domestic and commercial
              cleaning. This concept is built around a simple idea: making it
              easier to talk about the help your space needs.
            </p>
            <div className="about-values">
              <div>
                <span>01</span>
                <p>Your space, your priorities</p>
              </div>
              <div>
                <span>02</span>
                <p>Clear conversations from the start</p>
              </div>
              <div>
                <span>03</span>
                <p>Care in the everyday details</p>
              </div>
            </div>
            <Link className="text-link" to="/about">
              A little more about Stidy <ArrowUpRight size={17} />
            </Link>
          </Reveal>
        </div>
      </section>
      <section className="section container">
        <Reveal>
          <div className="center-heading">
            <Eyebrow>A SIMPLE START</Eyebrow>
            <h2>
              A cleaner space.
              <br />
              <em>In three little steps.</em>
            </h2>
          </div>
          <div className="process-grid">
            {business.process.map((step, index) => (
              <div className="process-step" key={step.title}>
                <span className="step-number">0{index + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
          <DraftNote>
            Illustrative enquiry process, subject to owner confirmation. This
            website does not take bookings.
          </DraftNote>
        </Reveal>
      </section>
      <section className="cta-section">
        <div className="container cta-inner">
          <div>
            <Eyebrow>LET’S MAKE SPACE FOR BETTER</Eyebrow>
            <h2>
              A fresh start begins
              <br />
              <em>with a conversation.</em>
            </h2>
            <p>
              Tell us about your space. We’ll show you how an enquiry could
              work.
            </p>
          </div>
          <div className="cta-actions">
            <ButtonLink to="/contact" light>
              Get a Free Quote
            </ButtonLink>
            <a href={business.phoneHref}>
              Or call {business.phone}
              <ArrowUpRight size={15} />
            </a>
            <small>Quote form is demonstration-only.</small>
          </div>
          <Sparkles
            className="cta-sparkle"
            strokeWidth={0.7}
            aria-hidden="true"
          />
        </div>
      </section>
      <section className="careers-strip container">
        <span className="careers-icon">
          <Sparkles size={27} strokeWidth={1.3} />
        </span>
        <div>
          <h3>A little care goes a long way.</h3>
          <p>
            Interested in cleaning work? Get to know the Stidy careers concept.
          </p>
        </div>
        <Link className="text-link" to="/careers">
          Join the Stidy Team <ArrowUpRight size={18} />
        </Link>
      </section>
    </>
  );
}
