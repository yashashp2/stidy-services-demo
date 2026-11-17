import { business } from "../data/business";
import { ButtonLink, DraftNote, Eyebrow, Photo } from "../components/UI";

export default function About() {
  return (
    <>
      <section className="container service-hero">
        <div>
          <Eyebrow>A LITTLE ABOUT STIDY</Eyebrow>
          <h1>
            Local roots.
            <br />
            <em>A fresh perspective.</em>
          </h1>
          <p className="lead">{business.about}</p>
          <ButtonLink to="/contact">Start a conversation</ButtonLink>
        </div>
        <Photo
          name="detail"
          alt="Illustrative interior with warm natural materials"
          width="1000"
          height="1000"
        />
        <span className="image-caption">
          Stock interior, not a Stidy project
        </span>
      </section>
      <section className="section container about-story">
        <Eyebrow>THE THINKING BEHIND THIS CONCEPT</Eyebrow>
        <h2>
          Good service begins
          <br />
          <em>with being understood.</em>
        </h2>
        <div>
          <p>
            A cleaning enquiry should feel straightforward. What matters in your
            space? Which areas need attention? What timing would work for you?
          </p>
          <p>
            This website concept gives those conversations a clear starting
            point, bringing Stidy’s domestic and commercial cleaning services
            together in one welcoming place.
          </p>
          <p>
            Based in Ilford, the business can be contacted directly to discuss
            service areas, availability and requirements.
          </p>
          <DraftNote>
            Brand positioning and service principles are draft copy for owner
            review, not a statement supplied or approved by Stidy.
          </DraftNote>
        </div>
      </section>
      <section className="small-cta container">
        <h2>
          Your space. <em>Your starting point.</em>
        </h2>
        <ButtonLink to="/contact">Get in touch</ButtonLink>
      </section>
    </>
  );
}
