import NavBar from "./components/NavBar";
import Hero from "./components/Hero";
import ExperienceTimeline from "./components/ExperienceTimeline";
import FeaturedProjects from "./components/FeaturedProjects";
import LabsSection from "./components/LabsSection";
import SkillTagCluster from "./components/SkillTagCluster";
import EducationCard from "./components/EducationCard";
import Footer from "./components/Footer";
import FloatingChatWidget from "./components/FloatingChatWidget";
import BackToTop from "./components/BackToTop";
import { ChatWidgetProvider } from "./context/ChatWidgetContext";

export default function App() {
  return (
    <ChatWidgetProvider>
      <main className="bg-bg">
        <NavBar />
        <Hero />
        <ExperienceTimeline />
        <FeaturedProjects />
        <SkillTagCluster />
        <EducationCard />
        <LabsSection />
        <Footer />
      </main>
      <FloatingChatWidget />
      <BackToTop />
    </ChatWidgetProvider>
  );
}
