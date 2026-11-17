import assert from "node:assert/strict";
import test from "node:test";
import { validate } from "../src/data/validation.ts";

const sample = {
  name: "Alex Taylor",
  email: "alex@example.com",
  phone: "07700 900123",
  cleaning: "Domestic cleaning",
  property: "Flat",
  postcode: "IG1 1AA",
  date: "",
  message: "",
};
test("accepts a valid enquiry without optional fields", () =>
  assert.deepEqual(validate(sample, false), {}));
test("required fields are individually identified", () =>
  assert.deepEqual(Object.keys(validate({}, false)), [
    "name",
    "email",
    "phone",
    "cleaning",
    "property",
    "postcode",
  ]));
test("careers requires only contact fields", () =>
  assert.deepEqual(
    validate(
      { name: "Alex", email: "alex@example.com", phone: "+44 7700 900123" },
      true,
    ),
    {},
  ));
test("rejects malformed email, phone and postcode", () => {
  const errors = validate(
    { ...sample, email: "alex@", phone: "abcdefghijk", postcode: "1234" },
    false,
  );
  assert.deepEqual(Object.keys(errors), ["email", "phone", "postcode"]);
});
test("rejects past dates and accepts a future preference", () => {
  assert.ok(validate({ ...sample, date: "2000-01-01" }, false).date);
  assert.deepEqual(validate({ ...sample, date: "2099-01-01" }, false), {});
});
test("accepts postcode spacing and case variations", () =>
  assert.deepEqual(validate({ ...sample, postcode: "ig11aa" }, false), {}));
test("rejects unknown service and property choices", () => {
  assert.ok(validate({ ...sample, cleaning: "unconfirmed" }, false).cleaning);
  assert.ok(validate({ ...sample, property: "unknown" }, false).property);
});
