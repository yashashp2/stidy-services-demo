export type FormValues = Record<string, string>;
export function validate(values: FormValues, careers: boolean): FormValues {
  const errors: FormValues = {};
  if (!values.name?.trim()) errors.name = "Please enter your full name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email?.trim() ?? ""))
    errors.email = "Please enter a valid email address.";
  const phone = values.phone?.trim() ?? "";
  if (
    !/^[+\d\s().-]+$/.test(phone) ||
    phone.replace(/\D/g, "").length < 10 ||
    phone.replace(/\D/g, "").length > 15
  )
    errors.phone = "Please enter a valid telephone number (10–15 digits).";
  if (!careers) {
    if (
      !["Domestic cleaning", "Commercial cleaning", "Help me choose"].includes(
        values.cleaning,
      )
    )
      errors.cleaning = "Please choose a cleaning type.";
    if (
      !["House", "Flat", "Workplace / business premises", "Other"].includes(
        values.property,
      )
    )
      errors.property = "Please choose a property type.";
    if (
      !/^(GIR\s?0AA|[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2})$/i.test(
        values.postcode?.trim() ?? "",
      )
    )
      errors.postcode = "Please enter a valid UK postcode.";
    if (values.date) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const date = new Date(`${values.date}T00:00:00`);
      if (Number.isNaN(date.getTime()) || date < today)
        errors.date = "Please choose today or a future date.";
    }
  }
  return errors;
}
