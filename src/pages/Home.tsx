import {
  AboutSection,
  Courses,
  FeaturesSection,
  HeroSection,
  LogoMarquee,
  NewsBlog,
  Newsletter,
  Stats,
  Workshop,
} from '../index';
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
      <Newsletter />
      <NewsBlog />
    </div>
  );
};

export default Home;
