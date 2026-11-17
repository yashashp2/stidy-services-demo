import { DemoForm } from "../components/DemoForm";
import { DraftNote, Eyebrow } from "../components/UI";
import { business } from "../data/business";

export default function Careers() {
  return (
    <section className="container form-page">
      <div className="form-intro">
        <Eyebrow>GOOD WORK STARTS WITH GOOD PEOPLE</Eyebrow>
        <h1>
          Join the
          <br />
          <em>Stidy Team.</em>
        </h1>
        <p className="lead">{business.careers}</p>
        <div className="careers-message">
          <h2>An introduction, not an application.</h2>
          <p>
            This concept shows how prospective cleaners could express an
            interest. The form does not submit a job application.
          </p>
          <p>
            Stidy has previously advertised for cleaners. Current vacancies,
            working arrangements, requirements and pay need to be confirmed
            directly with the business.
          </p>
        </div>
        <DraftNote>
          Recruitment information is based on a public post dated 9 November
          2025. It is not evidence of current vacancies. No CVs or documents are
          collected here.
        </DraftNote>
        <a className="text-link" href={`mailto:${business.email}`}>
          Contact Stidy directly by email
        </a>
      </div>
      <DemoForm careers />
    </section>
  );
}
