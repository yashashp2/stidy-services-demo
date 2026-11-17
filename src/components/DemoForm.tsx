import { useRef, useState, type FormEvent } from "react";
import { ArrowUpRight, Check, LockKeyhole } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { validate, type FormValues } from "../data/validation";

export function DemoForm({ careers = false }: { careers?: boolean }) {
  const [params] = useSearchParams();
  const initial = (): FormValues => ({
    name: "",
    email: "",
    phone: "",
    cleaning:
      params.get("type") === "domestic"
        ? "Domestic cleaning"
        : params.get("type") === "commercial"
          ? "Commercial cleaning"
          : "",
    property: "",
    postcode: "",
    date: "",
    message: "",
  });
  const [values, setValues] = useState<FormValues>(initial);
  const [errors, setErrors] = useState<FormValues>({});
  const [done, setDone] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const prefix = careers ? "career" : "quote";
  function update(key: string, value: string) {
    setValues((old) => ({ ...old, [key]: value }));
    setErrors((old) => {
      const next = { ...old };
      delete next[key];
      return next;
    });
  }
  function submit(event: FormEvent) {
    event.preventDefault();
    const next = validate(values, careers);
    setErrors(next);
    if (Object.keys(next).length) {
      requestAnimationFrame(() =>
        formRef.current
          ?.querySelector<HTMLElement>('[aria-invalid="true"]')
          ?.focus(),
      );
      return;
    }
    // Demo boundary: no network, localStorage, sessionStorage, analytics, email or logging.
    // Replace only after a secure backend, privacy notice and owner approval are in place.
    setValues(initial());
    setDone(true);
    requestAnimationFrame(() => successRef.current?.focus());
  }
  function field(
    key: string,
    label: string,
    type = "text",
    placeholder = "",
    options?: string[],
    optional = false,
  ) {
    const props = {
      id: `${prefix}-${key}`,
      name: key,
      value: values[key] ?? "",
      required: !optional,
      "aria-invalid": errors[key] ? (true as const) : undefined,
      "aria-describedby": errors[key] ? `${prefix}-${key}-error` : undefined,
      onChange: (
        event: React.ChangeEvent<
          HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >,
      ) => update(key, event.target.value),
    };
    return (
      <div className={`form-field ${key === "message" ? "full-width" : ""}`}>
        <label htmlFor={props.id}>
          {label}
          {optional && <span> (optional)</span>}
        </label>
        {options ? (
          <select {...props}>
            <option value="">Please select</option>
            {options.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        ) : type === "textarea" ? (
          <textarea
            {...props}
            placeholder={placeholder}
            rows={4}
            maxLength={3000}
          />
        ) : (
          <input
            {...props}
            type={type}
            placeholder={placeholder}
            maxLength={key === "name" ? 120 : 254}
            autoComplete="off"
            {...(type === "date"
              ? { min: new Date().toLocaleDateString("en-CA") }
              : {})}
          />
        )}
        {errors[key] && (
          <p id={`${prefix}-${key}-error`} className="field-error">
            {errors[key]}
          </p>
        )}
      </div>
    );
  }
  if (done)
    return (
      <div
        className="form-success"
        ref={successRef}
        tabIndex={-1}
        role="status"
      >
        <div className="success-icon">
          <Check size={30} />
        </div>
        <p className="eyebrow">DEMONSTRATION COMPLETE</p>
        <h2>
          That’s how simple
          <br />
          it could be.
        </h2>
        <p>
          This was a demonstration only. Nothing was sent, stored or emailed.
          Your entries have been cleared.
        </p>
        <p>No quote, booking or job application has been made.</p>
        <button
          className="button"
          onClick={() => {
            setDone(false);
            requestAnimationFrame(() =>
              formRef.current?.querySelector("input")?.focus(),
            );
          }}
        >
          Try the form again <ArrowUpRight size={18} />
        </button>
      </div>
    );
  return (
    <form className="demo-form" ref={formRef} onSubmit={submit} noValidate>
      <div className="form-heading">
        <h2>
          {careers
            ? "A fresh opportunity starts here."
            : "Tell us what you have in mind."}
        </h2>
        <p>
          Demo form · Please use sample details. All fields required unless
          marked optional.
        </p>
      </div>
      <div className="form-grid">
        {field("name", "Full name", "text", "Alex Taylor")}
        {field("email", "Email address", "email", "alex@example.com")}
        {field("phone", "Telephone number", "tel", "07700 900123")}
        {!careers && (
          <>
            {field("cleaning", "Cleaning type", "text", "", [
              "Domestic cleaning",
              "Commercial cleaning",
              "Help me choose",
            ])}
            {field("property", "Property type", "text", "", [
              "House",
              "Flat",
              "Workplace / business premises",
              "Other",
            ])}
            {field("postcode", "Postcode", "text", "IG1 1AA")}
            {field("date", "Preferred date", "date", "", undefined, true)}
          </>
        )}
        {field(
          "message",
          careers ? "A little about you" : "Additional requirements",
          "textarea",
          careers
            ? "Tell us about your experience and availability…"
            : "Which areas need attention? Anything else you would like to discuss?",
          undefined,
          true,
        )}
      </div>
      <div className="form-summary" aria-live="polite">
        {Object.keys(errors).length > 0
          ? "Please check the highlighted fields before continuing."
          : ""}
      </div>
      <button type="submit" className="button form-submit">
        {careers ? "Try the Interest Form" : "Try the Quote Request"}
        <ArrowUpRight size={18} />
      </button>
      <p className="privacy-note">
        <LockKeyhole size={14} />
        Demonstration only. Your details are never sent or saved.
      </p>
    </form>
  );
}
