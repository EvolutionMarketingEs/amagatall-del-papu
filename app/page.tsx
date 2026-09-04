import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Story } from "@/components/Story";
import { WhatIsIt } from "@/components/WhatIsIt";
import { PracticalInfo } from "@/components/PracticalInfo";
import { BookingWizard } from "@/components/booking/BookingWizard";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <Story />
        <WhatIsIt />
        <PracticalInfo />
        <BookingWizard />
      </main>
      <Footer />
    </>
  );
}
