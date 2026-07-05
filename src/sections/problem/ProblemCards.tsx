const PROBLEMS = [
  {
    name: "Fragmented Data Ecosystems",
    description: "Critical data lives across isolated systems that cannot communicate.",
  },
  {
    name: "Slow Decision Cycles",
    description: "Insights often arrive too late to prevent operational loss.",
  },
  {
    name: "Invisible Inefficiencies",
    description: "Downtime, waste, and leakage remain hidden.",
  },
  {
    name: "Human Bottlenecks",
    description: "Manual workflows limit scale and speed.",
  },
];

export default function ProblemCards() {
  return (
    <div className="relative z-10 text-center">
      <div className="mx-auto grid max-w-4xl gap-x-20 gap-y-12 text-left md:grid-cols-2">
        {PROBLEMS.map((problem) => (
          <div key={problem.name}>
            <h3
              style={{
                fontSize: "28px",
                fontWeight: 700,
                color: "#102A72",
              }}
            >
              {problem.name}
            </h3>
            <p
              className="mt-3"
              style={{
                fontSize: "18px",
                color: "#6B84B6",
                lineHeight: 1.7,
              }}
            >
              {problem.description}
            </p>
          </div>
        ))}
      </div>

      <p
        className="mt-16 text-lg italic"
        style={{ color: "#5D8FBE" }}
      >
        Intelligence should not live in silos.
      </p>
    </div>
  );
}
