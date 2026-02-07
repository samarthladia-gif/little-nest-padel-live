import Header from "@/components/Header";
import MatchContent from "@/components/MatchContent";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main
        className="pb-8 pt-5 sm:pb-12 sm:pt-8"
        style={{ paddingBottom: "max(2rem, calc(2rem + env(safe-area-inset-bottom)))" }}
      >
        <MatchContent />
      </main>
    </div>
  );
}
