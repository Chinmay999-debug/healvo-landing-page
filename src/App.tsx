import { Nav } from "./sections/Nav";
import { Hero } from "./sections/Hero";
import { Statement } from "./sections/Statement";
import { DayInClinic } from "./sections/DayInClinic";
import { SmallThings } from "./sections/SmallThings";
import { Pricing } from "./sections/Pricing";
import { Faq } from "./sections/Faq";
import { Closing } from "./sections/Closing";

export default function App() {
  return (
    <>
      <Nav />
      <main id="top">
        <Hero />
        <Statement />
        <DayInClinic />
        <SmallThings />
        <Pricing />
        <Faq />
        <Closing />
      </main>
    </>
  );
}
