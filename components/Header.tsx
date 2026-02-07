export default function Header() {
  return (
    <header
      className="sticky top-0 z-10 border-b border-pastel-blush/50 bg-pastel-cream/95 backdrop-blur-md shadow-soft"
      style={{ paddingTop: "max(0.75rem, env(safe-area-inset-top))" }}
    >
      <div className="mx-auto max-w-5xl px-4 py-4 text-center sm:px-6 sm:py-6">
        <h1 className="font-display text-xl font-normal leading-tight tracking-tight text-accent-forest sm:text-2xl md:text-3xl">
          Little Nest Parent&apos;s Padel Tournament 3.0
        </h1>
        <p className="mt-1 text-sm font-medium text-gray-600">
          Scoreboard &amp; schedule
        </p>
      </div>
    </header>
  );
}
