export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  tone = "light",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  tone?: "light" | "dark";
}) {
  return (
    <div
      className={
        align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl text-left"
      }
    >
      {eyebrow ? (
        <span
          className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.18em] ${
            tone === "dark"
              ? "border-white/15 bg-white/5 text-white/70"
              : "border-accent-line bg-white text-accent"
          }`}
        >
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{ backgroundColor: "var(--accent)" }}
          />
          {eyebrow}
        </span>
      ) : null}
      <h2
        className={`mt-4 text-[1.6rem] font-semibold leading-tight tracking-tight sm:text-[2.1rem] ${
          tone === "dark" ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {subtitle ? (
        <p
          className={`mt-3 text-[0.9rem] leading-relaxed sm:text-[0.98rem] ${
            tone === "dark" ? "text-white/60" : "text-ink/55"
          }`}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
