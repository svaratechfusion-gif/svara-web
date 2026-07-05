import { Briefcase, AtSign, Camera } from "lucide-react";

const COLUMNS = [
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
      { label: "Investors", href: "/investors" },
    ],
  },
  {
    heading: "Solutions",
    links: [
      { label: "Ecosystem", href: "/ecosystem" },
      { label: "Divisions", href: "/divisions" },
      { label: "Products", href: "/products" },
      { label: "Architecture", href: "/architecture" },
      { label: "Industries", href: "/industries" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Blogs", href: "/blogs" },
      { label: "Documentation", href: "/docs" },
      { label: "Media Kit", href: "/media-kit" },
      { label: "FAQs", href: "/faqs" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
      { label: "Cookies", href: "/cookies" },
    ],
  },
];

export default function Footer() {
  return (
    <footer style={{ background: "#0F1B4D" }}>
      <div className="mx-auto max-w-[1400px] px-8 py-20 xl:px-12">
        <div className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-1">
            <div
              className="text-2xl font-extrabold"
              style={{ color: "white", letterSpacing: "-0.04em" }}
            >
              SVARA
            </div>
            <p className="mt-4 max-w-xs text-sm" style={{ color: "#A9C1E0" }}>
              Engineering Intelligence for the Future of Industry.
            </p>
          </div>

          {COLUMNS.map((column) => (
            <div key={column.heading}>
              <h4
                className="text-xs font-bold uppercase tracking-[0.2em]"
                style={{ color: "#5D8FBE" }}
              >
                {column.heading}
              </h4>
              <ul className="mt-4 flex flex-col gap-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm transition-colors hover:text-white"
                      style={{ color: "#A9C1E0" }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          className="mt-16 flex flex-col items-center justify-between gap-4 border-t pt-8 sm:flex-row"
          style={{ borderColor: "rgba(255,255,255,0.12)" }}
        >
          <p className="text-xs" style={{ color: "#A9C1E0" }}>
            © 2026 SVARA TechFusion Pvt Ltd | All Rights Reserved
          </p>
          <div className="flex gap-4">
            <a href="#" aria-label="LinkedIn" style={{ color: "#A9C1E0" }}>
              <Briefcase size={18} />
            </a>
            <a href="#" aria-label="Twitter" style={{ color: "#A9C1E0" }}>
              <AtSign size={18} />
            </a>
            <a href="#" aria-label="Instagram" style={{ color: "#A9C1E0" }}>
              <Camera size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
