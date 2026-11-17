import { MapPin } from "lucide-react";
import { ContactDetails } from "../components/Layout";
import { DemoForm } from "../components/DemoForm";
import { DraftNote, Eyebrow } from "../components/UI";
import { business } from "../data/business";

export default function Contact() {
  return (
    <section className="container form-page">
      <div className="form-intro">
        <Eyebrow>A FRESH START</Eyebrow>
        <h1>
          Let’s talk about
          <br />
          <em>your space.</em>
        </h1>
        <p className="lead">
          A home that feels lighter. A workplace that feels ready. Tell us what
          you’re looking for.
        </p>
        <ContactDetails />
        <p className="location-line">
          <MapPin size={18} />
          {business.location}
        </p>
        <DraftNote>
          This is a demonstration form. Nothing is sent, saved or emailed. For a
          real enquiry, use the reported public contact details above. Service
          area, availability and quotes must be confirmed directly.
        </DraftNote>
      </div>
      <DemoForm />
    </section>
  );
}
