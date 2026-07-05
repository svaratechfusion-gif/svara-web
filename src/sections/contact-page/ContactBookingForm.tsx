import Reveal from "@/components/ui/reveal";
import Section from "@/components/ui/section";

const INDUSTRIES = ["Manufacturing", "Agriculture", "Logistics", "Healthcare", "Smart Cities", "Retail", "Other"];
const COMPANY_SIZES = ["1–10", "11–50", "51–200", "201–1000", "1000+"];
const REQUIREMENTS = ["Vision AI", "Drone AI", "Digital Twin", "AI Agents", "AI OS", "Custom AI Solution", "Consultation"];
const BUDGETS = ["Under ₹5 Lakhs", "₹5–25 Lakhs", "₹25 Lakhs–₹1 Cr", "₹1 Cr+"];
const TIMELINES = ["Immediate", "1–3 Months", "3–6 Months", "6+ Months"];

const inputStyle = {
  borderColor: "rgba(220,230,242,0.8)",
  color: "#1D2E6D",
};

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label
      className="text-xs font-bold uppercase tracking-[0.15em]"
      style={{ color: "#5D8FBE" }}
    >
      {children}
    </label>
  );
}

export default function ContactBookingForm() {
  return (
    <Section size="medium" className="bg-white">
      <Reveal className="relative mx-auto max-w-3xl">
        <h2
          className="text-center text-cinematic-subheading font-extrabold"
          style={{ color: "#1D2E6D" }}
        >
          Book A Strategic Consultation
        </h2>
        <p
          className="mx-auto mt-6 max-w-xl text-center text-cinematic-body"
          style={{ color: "#5D8FBE" }}
        >
          Schedule a discovery session with SVARA experts to explore how AI
          can transform your operations.
        </p>

        <div
          className="mt-10 rounded-3xl border p-8 shadow-card lg:p-12"
          style={{ borderColor: "rgba(220,230,242,0.8)", background: "var(--tint)" }}
        >
          <h3
            className="text-xs font-bold uppercase tracking-[0.2em]"
            style={{ color: "#5D8FBE" }}
          >
            Personal Details
          </h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <FieldLabel>Full Name</FieldLabel>
              <input type="text" className="rounded-xl border bg-white px-4 py-3 text-sm outline-none" style={inputStyle} />
            </div>
            <div className="flex flex-col gap-2">
              <FieldLabel>Company Name</FieldLabel>
              <input type="text" className="rounded-xl border bg-white px-4 py-3 text-sm outline-none" style={inputStyle} />
            </div>
            <div className="flex flex-col gap-2">
              <FieldLabel>Designation</FieldLabel>
              <input type="text" className="rounded-xl border bg-white px-4 py-3 text-sm outline-none" style={inputStyle} />
            </div>
            <div className="flex flex-col gap-2">
              <FieldLabel>Email Address</FieldLabel>
              <input type="email" className="rounded-xl border bg-white px-4 py-3 text-sm outline-none" style={inputStyle} />
            </div>
            <div className="flex flex-col gap-2 sm:col-span-2">
              <FieldLabel>Phone Number</FieldLabel>
              <input type="tel" className="rounded-xl border bg-white px-4 py-3 text-sm outline-none" style={inputStyle} />
            </div>
          </div>

          <h3
            className="mt-10 text-xs font-bold uppercase tracking-[0.2em]"
            style={{ color: "#5D8FBE" }}
          >
            Business Context
          </h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <FieldLabel>Industry</FieldLabel>
              <select className="rounded-xl border bg-white px-4 py-3 text-sm outline-none" style={inputStyle}>
                {INDUSTRIES.map((industry) => (
                  <option key={industry}>{industry}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <FieldLabel>Company Size</FieldLabel>
              <select className="rounded-xl border bg-white px-4 py-3 text-sm outline-none" style={inputStyle}>
                {COMPANY_SIZES.map((size) => (
                  <option key={size}>{size}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-2 sm:col-span-2">
              <FieldLabel>Location</FieldLabel>
              <input type="text" className="rounded-xl border bg-white px-4 py-3 text-sm outline-none" style={inputStyle} />
            </div>
          </div>

          <h3
            className="mt-10 text-xs font-bold uppercase tracking-[0.2em]"
            style={{ color: "#5D8FBE" }}
          >
            Requirement Qualification
          </h3>
          <div className="mt-4">
            <FieldLabel>What Are You Looking For?</FieldLabel>
            <div className="mt-3 flex flex-wrap gap-3">
              {REQUIREMENTS.map((req) => (
                <label
                  key={req}
                  className="flex items-center gap-2 rounded-full border bg-white px-4 py-2 text-sm font-semibold"
                  style={inputStyle}
                >
                  <input type="checkbox" />
                  {req}
                </label>
              ))}
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <FieldLabel>Budget Range</FieldLabel>
              <select className="rounded-xl border bg-white px-4 py-3 text-sm outline-none" style={inputStyle}>
                {BUDGETS.map((budget) => (
                  <option key={budget}>{budget}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <FieldLabel>Project Timeline</FieldLabel>
              <select className="rounded-xl border bg-white px-4 py-3 text-sm outline-none" style={inputStyle}>
                {TIMELINES.map((timeline) => (
                  <option key={timeline}>{timeline}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-2">
            <FieldLabel>Challenge Description</FieldLabel>
            <textarea
              rows={4}
              placeholder="Tell us about your business problem or transformation goals."
              className="rounded-xl border bg-white px-4 py-3 text-sm outline-none"
              style={inputStyle}
            />
          </div>

          <button
            type="button"
            className="btn-glow-pulse mt-8 w-full rounded-2xl px-8 py-4 text-lg font-bold text-white shadow-card transition-all duration-300 hover:scale-[1.01] hover:shadow-floating"
            style={{ background: "linear-gradient(135deg,#1D2E6D,#5D8FBE)" }}
          >
            Schedule Consultation
          </button>
        </div>
      </Reveal>
    </Section>
  );
}
