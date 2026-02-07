export default function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-pastel-blush/50 bg-pastel-cream/90 backdrop-blur-md shadow-soft">
      <div className="mx-auto max-w-5xl px-4 py-6 text-center sm:px-6 sm:py-7">
        <h1 className="font-display text-2xl font-normal tracking-tight text-accent-forest sm:text-3xl">
          Little Nest Parent&apos;s Padel Tournament 3.0
        </h1>
        <p className="mt-1 text-sm font-medium text-gray-600 sm:text-base">
          Scoreboard &amp; schedule
        </p>
      </div>
    </header>
  );
}
