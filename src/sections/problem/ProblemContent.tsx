import ProblemWidgets from "./ProblemWidgets";

export default function ProblemContent() {
  return (
    <div className="text-center">
      <p
        className="text-xs font-bold uppercase tracking-[0.25em]"
        style={{ color: "#5D8FBE" }}
      >
        THE PROBLEM
      </p>

      <h2
        className="text-cinematic-heading mt-4"
        style={{ color: "#1D2E6D" }}
      >
        Industry Is Drowning
        <br />
        In Operational Complexity
      </h2>

      <p
        className="text-cinematic-body mx-auto mt-6 max-w-4xl"
        style={{ color: "#5D8FBE" }}
      >
        Modern enterprises generate massive volumes of operational data,
        yet critical decisions remain delayed by fragmented systems,
        disconnected workflows, and poor real-time visibility.
      </p>

      <ProblemWidgets />
    </div>
  );
}
