import Header from "@/components/Header";
import MatchContent from "@/components/MatchContent";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pb-12 pt-8">
        <MatchContent />
      </main>
    </div>
  );
}
