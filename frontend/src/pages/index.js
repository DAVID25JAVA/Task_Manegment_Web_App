import NewsLetter from "@/component/NewsLetter";
import Features from "./Features";
import Testimonials from "./Testimonials";
import HeroSection from "./HeroSection";

const LandingPage = () => {

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-orange-50 to-pink-100">
      {/* Header */}
      <HeroSection />
      {/* Features */}
      <Features />
      {/* Testimonials Section */}
      <Testimonials />
      {/* News Letter */}
      <NewsLetter />
    </div>
  );
};

export default LandingPage;
