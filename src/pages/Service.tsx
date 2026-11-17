import { Check, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { business, services, type ServiceKey } from "../data/business";
import {
  ButtonLink,
  DraftNote,
  Eyebrow,
  Photo,
  Reveal,
} from "../components/UI";

export default function Service({ kind }: { kind: ServiceKey }) {
  const service = services[kind];
  return (
    <>
      <section className="container service-hero">
        <div>
          <Link className="breadcrumb" to="/">
            Home / <span>{service.name}</span>
          </Link>
          <Eyebrow>{service.name.toUpperCase()}</Eyebrow>
          <h1>{service.headline}</h1>
          <p className="lead">{service.intro}</p>
          <ButtonLink to={`/contact?type=${kind}`}>
            Let’s talk about your space
          </ButtonLink>
        </div>
        <Photo
          name={service.image}
          alt={service.alt}
          width="1000"
          height="1000"
        />
        <span className="image-caption">Illustrative stock photography</span>
      </section>
      <section className="section container detail-grid">
        <Reveal>
          <Eyebrow>THE LITTLE DETAILS</Eyebrow>
          <h2>
            {kind === "domestic"
              ? "What would make home feel better?"
              : "What does your workplace need?"}
          </h2>
          <p className="lead">
            {kind === "domestic"
              ? "Use these examples to start a conversation about your home. The rooms, tasks and timing would be agreed before any booking."
              : "Every business has different requirements. These are discussion points, not a claim that Stidy currently serves any particular industry or type of premises."}
          </p>
          <DraftNote>{business.serviceNote}</DraftNote>
        </Reveal>
        <Reveal className="task-list">
          {service.tasks.map((task, i) => (
            <div key={task}>
              <span>0{i + 1}</span>
              <h3>{task}</h3>
              <Check size={18} />
            </div>
          ))}
        </Reveal>
      </section>
      <section className="soft-section">
        <div className="container">
          <Eyebrow>BUILT AROUND YOUR SPACE</Eyebrow>
          <h2>A thoughtful starting point.</h2>
          <div className="benefit-grid">
            {service.benefits.map((benefit) => (
              <div key={benefit}>
                <Check size={22} />
                <h3>{benefit}</h3>
              </div>
            ))}
          </div>
          <DraftNote>
            These are proposed service principles for the owner to review.
          </DraftNote>
        </div>
      </section>
      <section className="section container">
        <div className="section-heading">
          <div>
            <Eyebrow>HOW IT COULD WORK</Eyebrow>
            <h2>Keep the next step simple.</h2>
          </div>
          <Link to={`/contact?type=${kind}`} className="text-link">
            Try a quote enquiry <ArrowUpRight size={18} />
          </Link>
        </div>
        <div className="process-grid">
          {business.process.map((step, i) => (
            <div className="process-step" key={step.title}>
              <span className="step-number">0{i + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          ))}
        </div>
        <DraftNote>
          Proposed process. No booking or enquiry is sent from this demo.
        </DraftNote>
      </section>
      <section className="small-cta container">
        <h2>
          Let’s talk about <em>your space.</em>
        </h2>
        <ButtonLink to={`/contact?type=${kind}`}>Get a Free Quote</ButtonLink>
      </section>
    </>
  );
}
