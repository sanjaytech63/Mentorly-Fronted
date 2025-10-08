import { AboutSection, Courses, FeaturesSection, HeroSection, LogoMarquee, Newsletter, Stats, Workshop } from '../componets/index';
const Home = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <LogoMarquee />
      <FeaturesSection />
      <AboutSection />
      <Courses />
      <Workshop />
      <Stats />
      <Newsletter/>
    </div>
  );
};

export default Home;
