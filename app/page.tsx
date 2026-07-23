import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/home/Hero";
import { Statistics } from "@/components/home/Statistics";
import { Features } from "@/components/home/Features";
import { Footer } from "@/components/layout/Footer";
import { FAQ } from "@/components/home/faq";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      <Hero />
      <Statistics />
      <Features />
      <FAQ />
      <Footer />
    </main>
  );
}
