// Public contact details were checked against Nextdoor on 17 November 2026.
// Service examples, process and brand copy remain proposals for owner review.
export const business = {
  name: "Stidy Services Ltd",
  phone: "07933 961994",
  phoneHref: "tel:+447933961994",
  email: "Stidyservices@gmail.com",
  whatsapp: "https://wa.me/447933961994",
  location: "Ilford, East London",
  profile:
    "https://nextdoor.co.uk/pages/stidy-services-ltd-domestic-commercial-cleaning/",
  notice:
    "Independent website redesign concept — not affiliated with or endorsed by Stidy Services Ltd.",
  hero: {
    headingLines: ["Exceptional", "Cleaning."],
    accent: "Beautifully Simple.",
    description:
      "Professional domestic and commercial cleaning services in Ilford and East London. Discover a cleaner, more comfortable space.",
  },
  about:
    "Stidy Services is a local domestic and commercial cleaning business based in Ilford. This concept puts straightforward communication and attention to the little things at the heart of the experience.",
  careers:
    "Take pride in the little details? Introduce yourself and your cleaning experience using the demonstration form below.",
  serviceNote:
    "Proposed service details — tasks, frequency, equipment and availability need confirmation with Stidy.",
  process: [
    {
      title: "Tell us about your space",
      description:
        "Share the type of property, your postcode and what you would like help with.",
    },
    {
      title: "Talk through the details",
      description:
        "Discuss your priorities, access and preferred timing, then agree a suitable quote.",
    },
    {
      title: "Make room for a fresh start",
      description:
        "Once the details are agreed, arrange your clean directly with Stidy.",
    },
  ],
} as const;

export const services = {
  domestic: {
    name: "Domestic Cleaning",
    short: "For the place you call home.",
    description:
      "A fresh kitchen. A welcoming living room. Explore cleaning for the spaces you live in, with your priorities at the centre.",
    headline: "A fresher home. A little more you-time.",
    intro:
      "From everyday living spaces to the corners that need a little attention, start a conversation about what a clean, comfortable home means to you.",
    image: "living-room",
    alt: "Light-filled living room with white armchairs, a tan sofa and indoor plants",
    tasks: [
      "Dusting reachable surfaces",
      "Vacuuming and mopping floors",
      "Kitchen worktops and external surfaces",
      "Bathroom fixtures and surfaces",
    ],
    benefits: [
      "Focus on the rooms that matter to you",
      "Discuss a time that suits your household",
      "Agree the scope before a clean is booked",
    ],
  },
  commercial: {
    name: "Commercial Cleaning",
    short: "A better space to do business.",
    description:
      "Make the right first impression. Discuss cleaning requirements for your workspace, shaped around the way your business runs.",
    headline: "A considered clean for your working day.",
    intro:
      "A welcoming workplace starts with the details. Tell Stidy about your premises, daily routine and cleaning priorities to explore a suitable arrangement.",
    image: "workspace",
    alt: "Illustrative modern office with glass partitions and shared seating areas",
    tasks: [
      "Shared surfaces and touchpoints",
      "Floor care in agreed areas",
      "Staff kitchen and washroom requirements",
      "Access, timing and site-specific needs",
    ],
    benefits: [
      "Put your workplace priorities first",
      "Discuss cleaning around your working hours",
      "Agree access and requirements in advance",
    ],
  },
} as const;
export type ServiceKey = keyof typeof services;

export function asset(path: string) {
  return `${import.meta.env.BASE_URL}${path}`;
}
